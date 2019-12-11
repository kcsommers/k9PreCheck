import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject, of, Subscriber } from 'rxjs';
import { take } from 'rxjs/operators';
import { ColumnIds } from '../core/public-api';

@Injectable({
  providedIn: 'root'
})
export class SmartsheetService {
  private _k9Rows: any[] = [];
  public fetching$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
    this.fetching$.next(true);
    this.getK9PreCheckSheet().pipe(take(1))
      .subscribe(sheet => {
        if (sheet && sheet.rows) {
          this._k9Rows = sheet.rows;
        }
        setTimeout(() => {
          this.fetching$.next(false);
        }, 5000)

      }),
      (err: any) => {
        console.error(err);
        this.fetching$.next(false);
      };
  }

  public getRow(id: string, mode: 'trip' | 'member'): Observable<any> {
    const filtered = () => {
      // tslint:disable-next-line: max-line-length
      const imgs = ['img-src-dog', 'img-src-owner', 'img-src-crate', 'img-src-water', 'img-src-con1', 'img-src-con2', 'img-src-con3', 'img-src-con4'];
      const row = this._k9Rows.find(r => r.cells.some(c => (mode === 'trip' ?
        (c.columnId === ColumnIds.OUTBOUND_AIRWAY_BILL || c.columnId === ColumnIds.RETURN_AIRWAY_BILL) :
        (c.columnId === ColumnIds.AKC_NUMBER)
      ) && c.value === id));

      if (row && row.cells && row.cells.length) {
        const newRow = {};
        row.cells.forEach(cell => {
          newRow[cell.columnId] = cell.value;
        });
        return newRow;
      }
      return null;
    }
    if (!this.fetching$.value) {
      return of(filtered());
    } else {
      return new Observable<any>((subscriber: Subscriber<any>) => {
        const fetchSubscr$ = this.fetching$.subscribe(
          (fetching: boolean) => {
            if (!fetching) {
              subscriber.next(filtered())
              fetchSubscr$.unsubscribe();
            }
          }
        )
      });
    }
  }

  public getSheets(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/sheets`);
  }

  public getK9PreCheckSheet(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/sheets/k9PreCheck`);
  }
}


//   private getImages(ids: string[]): Observable<any> {
//     return this.http.post(`${environment.apiUrl}/cells/image`, ids);
//   }

//   public getRow(id: string): Observable<any> {
//     const filtered = (): Observable<any> => {
//       const row = this._k9Rows.find(r => r.cells.some(c => (
//         (c.columnId === ColumnIds.OUTBOUND_AIRWAY_BILL || c.columnId === ColumnIds.RETURNING_AIRWAY_BILL) && c.value === id))
//       );
//       const imgIds = [];
//       if (row && row.cells && row.cells.length) {
//         const newRow = {};
//         row.cells.forEach(cell => {
//           newRow[cell.columnId] = cell.value;
//           if (cell.image) {
//             imgIds.push([cell.columnId, cell.image]);
//           }
//         });
//         if (imgIds.length) {
//           return new Observable(subscriber => {
//             this.getImages(imgIds).pipe(take(1))
//               .subscribe((urls: [string, string][]) => {
//                 urls.forEach(url => {
//                   newRow[url[0]] = url[1];
//                 });
//                 subscriber.next(newRow);
//               });
//           });
//         } else {
//           return of(newRow);
//         }
//       }
//       return of(null);
//     }
//     if (!this.fetching$.value) {
//       return filtered();
//     } else {
//       console.log('Elsing')
//       return this.fetching$.pipe(
//         take(1),
//         switchMap(fetching => fetching ? filtered() : of(null))
//       );
//       // return new Observable<any>((subscriber: Subscriber<any>) => {
//       //   const fetchSubscr$ = this.fetching$.subscribe(
//       //     (fetching: boolean) => {
//       //       if (!fetching) {
//       //         subscriber.next(filtered())
//       //         fetchSubscr$.unsubscribe();
//       //       }
//       //     }
//       //   )
//       // })
//     }
//   }


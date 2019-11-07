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
  private fetching$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
    this.fetching$.next(true);
    this.getK9PreCheckSheet().pipe(take(1))
      .subscribe(sheet => {
        if (sheet && sheet.rows) {
          this._k9Rows = sheet.rows;
        }
        this.fetching$.next(false);
      }),
      (err) => {
        console.error(err);
        this.fetching$.next(false);
      };
  }

  public getRow(id: string): Observable<any> {
    const filtered = () => {
      const row = this._k9Rows.find(r => r.cells.some(c => (
        (c.columnId === ColumnIds.OUTBOUND_AIRWAY_BILL || c.columnId === ColumnIds.RETURNING_AIRWAY_BILL) && c.value === id))
      );
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
      return of(filtered);
    } else {
      return new Observable<any>((subscriber: Subscriber<any>) => {
        const fetchSubscr$ = this.fetching$.subscribe(
          (fetching: boolean) => {
            if (!fetching) {
              subscriber.next(filtered)
              fetchSubscr$.unsubscribe();
            }
          }
        )
      })
    }
  }

  public getSheets(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/sheets`);
  }

  public getK9PreCheckSheet(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/sheets/k9PreCheck`);
  }
}

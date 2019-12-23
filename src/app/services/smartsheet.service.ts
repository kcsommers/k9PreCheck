import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject, of, Subscriber } from 'rxjs';
import { take } from 'rxjs/operators';
import { K9ColumnIds, Sheets } from '../core/public-api';
import { K9RegistrationColumnIds } from '../core/column-ids.enum';

@Injectable({
  providedIn: 'root'
})
export class SmartsheetService {
  public fetching$ = new BehaviorSubject(false);
  public sheetMap = new Map<Sheets, any>();

  constructor(private http: HttpClient) {
    this.fetchSheet(Sheets.K9_PRE_CHECK);
  }

  public fetchSheet(sheet: Sheets) {
    this.fetching$.next(true);
    this.getK9PreCheckSheet(sheet).pipe(take(1))
      .subscribe(sheetData => {
        if (sheetData && sheetData.rows) {
          this.cacheSheet(sheet, sheetData.rows);
        }
        this.fetching$.next(false);
      }),
      (err: any) => {
        console.error(err);
        this.fetching$.next(false);
      };
  }

  public getRow(id: string, sheet: Sheets): Observable<any> {
    const filtered = () => {
      const sheetData = this.sheetMap.get(sheet);
      if (sheetData) {
        const row = sheetData.find(r => r.cells.some(c => {
          if (sheet === Sheets.K9_PRE_CHECK) {
            return (c.columnId === K9ColumnIds.OUTBOUND_AIRWAY_BILL || c.columnId === K9ColumnIds.RETURN_AIRWAY_BILL) && c.value === id;
          } else {
            return c.columnId === K9RegistrationColumnIds.AKC_NUMBER && c.value === id;
          }
        }));
        if (row && row.cells && row.cells.length) {
          const newRow = {};
          row.cells.forEach(cell => {
            newRow[cell.columnId] = cell.value;
          });
          return newRow;
        }
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
      })
    }
  }

  public getSheets(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/sheets`);
  }

  public getColumns(sheet: Sheets): Observable<any> {
    return this.http.get(`${environment.apiUrl}/columns/${sheet}`)
  }

  public getK9PreCheckSheet(sheet: Sheets): Observable<any> {
    return this.http.get(`${environment.apiUrl}/sheets/${sheet}`);
  }

  public cacheSheet(sheet: Sheets, data: any) {
    this.sheetMap.set(sheet, data);
  }

  public getCachedSheet(sheet: Sheets) {
    return this.sheetMap.get(sheet);
  }
}

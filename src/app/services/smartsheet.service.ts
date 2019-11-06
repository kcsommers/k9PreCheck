import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ColumnIds } from '../core/public-api';

@Injectable({
  providedIn: 'root'
})
export class SmartsheetService {
  private _k9Rows: any[] = [];

  constructor(private http: HttpClient) {
    this.getK9PreCheckSheet().pipe(take(1)).subscribe(
      sheet => {
        if (sheet && sheet.rows) {
          this._k9Rows = sheet.rows;
        }
      });
  }

  public getRow(id: string) {
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

  public getSheets(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/sheets`);
  }

  public getK9PreCheckSheet(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/sheets/k9PreCheck`);
  }
}

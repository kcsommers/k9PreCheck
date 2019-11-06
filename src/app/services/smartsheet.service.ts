import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ColumnIds } from '../core/public-api';

const smartsheetToken = 's49ade7q7u504pa904twt2m9wx';

@Injectable({
  providedIn: 'root'
})
export class SmartsheetService {
  private _k9Rows: any[] = [];
  private _headers = new HttpHeaders({
    'Authorization': `Bearer ${smartsheetToken}`,
    'Content-Type': 'application/json'
  });

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
    return this.http.get('https://api.smartsheet.com/2.0/sheets', { headers: this._headers });
  }

  public getK9PreCheckSheet(): Observable<any> {
    return this.http.get('https://api.smartsheet.com/2.0/sheets/8529102538860420', { headers: this._headers });
  }

  public searchK9PreCheckSheet(): Observable<any> {
    return this.http.get('https://api.smartsheet.com/2.0//search/sheets/8529102538860420?query=DN21988181', { headers: this._headers });
  }

  // public getSheets(): Observable<any> {
  //   return this.http.get('/api/sheets', { headers: this._headers });
  // }

  // public getK9PreCheckSheet(): Observable<any> {
  //   return this.http.get('/api/sheets/8529102538860420', { headers: this._headers });
  // }

  // public searchK9PreCheckSheet(): Observable<any> {
  //   return this.http.get('/api/search/sheets/8529102538860420?query=DN21988181', { headers: this._headers });
  // }
}

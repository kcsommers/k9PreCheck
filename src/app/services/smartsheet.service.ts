import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmartsheetService {
  private _headers = new HttpHeaders({
    'Authorization': `Bearer ${environment.smartsheetToken}`,
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {
  }

  public getSheets(): Observable<any> {
    console.log('HEaders:::: ', this._headers)
    return this.http.get('/api/sheets', { headers: this._headers });
  }
}

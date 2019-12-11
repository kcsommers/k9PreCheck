import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppModeService {
  private _mode: 'trip' | 'member' = 'trip';
  public get mode(): 'trip' | 'member' {
    return this._mode;
  }
  public updateMode(mode: 'trip' | 'member') {
    this._mode = mode;
  }
}

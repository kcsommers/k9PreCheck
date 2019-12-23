import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppModeService } from 'src/app/services/app-mode.service';
import { SmartsheetService } from 'src/app/services/smartsheet.service';
import { Sheets } from 'src/app/core/public-api';

@Component({
  selector: 'k9-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input()
  public searchError$: BehaviorSubject<boolean>;

  @Input()
  public data$: BehaviorSubject<any>;

  @Input()
  public fetching$: BehaviorSubject<boolean>;

  @Output()
  public search = new EventEmitter<string>();

  @Output()
  public clear = new EventEmitter<boolean>();

  @Output()
  public modeUpdated = new EventEmitter<string>();

  public searchButtonText$ = new BehaviorSubject('FIND');

  private _destroy$ = new Subject();

  public get searchbarPlaceholder() {
    return `START HERE! ENTER ${this.modeService.mode === 'trip' ? 'AIRWAY BILL (AWB)' : 'AKC'} NUMBER`;
  }

  constructor(public modeService: AppModeService, private smartsheet: SmartsheetService) { }

  ngOnInit() {
    this.data$.pipe(takeUntil(this._destroy$))
      .subscribe(data => {
        if (data) {
          this.searchButtonText$.next('CLEAR');
        } else {
          this.searchButtonText$.next('FIND');
        }
      },
        err => this.searchButtonText$.next('CLEAR')
      );

    this.searchError$.pipe(takeUntil(this._destroy$))
      .subscribe(err => {
        if (err) {
          this.searchButtonText$.next('CLEAR');
        }
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.unsubscribe();
  }

  public updateMode(mode: 'trip' | 'member') {
    this.modeService.updateMode(mode);
    if (mode === 'member' && !this.smartsheet.sheetMap.has(Sheets.K9_PRE_CHECK_REGISTRATION)) {
      this.smartsheet.fetchSheet(Sheets.K9_PRE_CHECK_REGISTRATION);
    }
    this.searchButtonText$.next('FIND');
  }
}

import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  public mode = 'trip';

  private _destroy$ = new Subject();

  constructor() { }

  ngOnInit() {
    this.data$.pipe(takeUntil(this._destroy$))
      .subscribe(data => {
        if (data) {
          this.searchButtonText$.next('CLEAR');
        } else {
          this.searchButtonText$.next('FIND');
        }
      },
        err => this.searchButtonText$.next('FIND')
      );

    this.searchError$.pipe(takeUntil(this._destroy$))
      .subscribe(err => {
        if (err) {
          this.searchButtonText$.next('FIND');
        }
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.unsubscribe();
  }

  public updateMode(mode: string) {
    if (mode !== this.mode) {
      this.mode = mode;
      this.modeUpdated.emit(mode);
    }
  }
}

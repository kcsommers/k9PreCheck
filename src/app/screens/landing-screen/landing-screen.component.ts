import { Component, OnInit, ChangeDetectorRef, ViewChild, HostListener } from '@angular/core';
import { SmartsheetService } from 'src/app/services/smartsheet.service';
import { BehaviorSubject } from 'rxjs';
import { ColumnIds } from '../../core/column-ids.enum';
import { take } from 'rxjs/operators';

@Component({
  selector: 'k9-landing-screen',
  templateUrl: './landing-screen.component.html',
  styleUrls: ['./landing-screen.component.scss']
})
export class LandingScreenComponent implements OnInit {
  public searchError$ = new BehaviorSubject(false);
  public data$ = new BehaviorSubject(null);
  public columnIds = ColumnIds;
  public fetching$ = new BehaviorSubject(false);

  constructor(private smartsheet: SmartsheetService, private cd: ChangeDetectorRef) {
    // this.smartsheet.getK9PreCheckSheet().subscribe(r => {
    //   console.log('Sheet:::: ', r)
    // })
  }

  ngOnInit() {
    setTimeout(() => {
      // D1818177
      // AK009864
      this.doSearch('AK009864');
    }, 2000)
  }

  public doSearch(searchTerm: string) {
    this.fetching$.next(true);
    if (this.searchError$.value) {
      this.searchError$.next(false);
    }
    this.smartsheet.getRow(searchTerm).pipe(take(1))
      .subscribe(row => {
        if (row) {
          this.data$.next(row);
        } else {
          this.searchError$.next(true);
        }
        this.fetching$.next(false);
      });
  }

  public doClear(event: boolean) {
    this.fetching$.next(false);
    this.searchError$.next(false);
    this.data$.next(null);
  }

}

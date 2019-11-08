import { Component, OnInit } from '@angular/core';
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

  constructor(private smartsheet: SmartsheetService) {
  }

  ngOnInit() {
    // setTimeout(() => {
    //   this.doSearch('D1818177');
    // }, 2000)
  }

  public doSearch(searchTerm: string) {
    this.fetching$.next(true);
    if (this.searchError$.value) {
      this.searchError$.next(false);
    }
    // D1818177
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

}

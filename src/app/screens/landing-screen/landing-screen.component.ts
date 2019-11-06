import { Component, OnInit } from '@angular/core';
import { SmartsheetService } from 'src/app/services/smartsheet.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-landing-screen',
  templateUrl: './landing-screen.component.html',
  styleUrls: ['./landing-screen.component.scss']
})
export class LandingScreenComponent implements OnInit {
  public searchError$ = new BehaviorSubject(false);
  public data$ = new BehaviorSubject(null);

  constructor(private smartsheet: SmartsheetService) {
  }

  ngOnInit() {
  }

  public doSearch(searchTerm: string) {
    if (this.searchError$.value) {
      this.searchError$.next(false);
    }
    // DN21988181
    const row = this.smartsheet.getRow(searchTerm);
    console.log('Row:::: ', row);
    if (row) {
      this.data$.next(row);
    } else {
      this.searchError$.next(true);
    }
  }

}

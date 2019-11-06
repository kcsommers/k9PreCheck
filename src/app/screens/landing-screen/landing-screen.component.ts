import { Component, OnInit } from '@angular/core';
import { SmartsheetService } from 'src/app/services/smartsheet.service';
import { BehaviorSubject } from 'rxjs';
import { ColumnIds } from '../../core/column-ids.enum';

@Component({
  selector: 'k9-landing-screen',
  templateUrl: './landing-screen.component.html',
  styleUrls: ['./landing-screen.component.scss']
})
export class LandingScreenComponent implements OnInit {
  public searchError$ = new BehaviorSubject(false);
  public data$ = new BehaviorSubject(null);
  public columnIds = ColumnIds;

  constructor(private smartsheet: SmartsheetService) {
  }

  ngOnInit() {
    this.smartsheet.getK9PreCheckSheet().subscribe(sheet => {
      const hmm = sheet.columns.map(c => `${c.title.toUpperCase().replace(' ', '_')} = ${c.id}`);
    });
  }

  public doSearch(searchTerm: string) {
    if (this.searchError$.value) {
      this.searchError$.next(false);
    }
    // D1818177
    const row = this.smartsheet.getRow(searchTerm);
    console.log('Row:::: ', row[this.columnIds.NOTES]);
    if (row) {
      this.data$.next(row);
    } else {
      this.searchError$.next(true);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { SmartsheetService } from 'src/app/services/smartsheet.service';

@Component({
  selector: 'app-landing-screen',
  templateUrl: './landing-screen.component.html',
  styleUrls: ['./landing-screen.component.scss']
})
export class LandingScreenComponent implements OnInit {

  constructor(private smartsheet: SmartsheetService) {
  }

  ngOnInit() {
    const data = this.smartsheet.getSheets().subscribe(sheets => {
      console.log('SHEETS:::: ', sheets);
    });
  }

}

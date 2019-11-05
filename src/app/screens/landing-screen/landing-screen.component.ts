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
    setTimeout(() => {
      const row = this.smartsheet.getRow('DN21988181');
      console.log('Row:::: ', row);
    }, 5000)

  }

}

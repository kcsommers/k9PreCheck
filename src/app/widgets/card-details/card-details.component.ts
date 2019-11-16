import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'k9-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {
  @Input()
  public details: string[];

  constructor() { }

  ngOnInit() {
  }

}

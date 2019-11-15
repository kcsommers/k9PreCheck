import { Component, OnInit } from '@angular/core';
import { tos } from '../../core/tos';

@Component({
  selector: 'k9-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public terms = tos;

  constructor() { }

  ngOnInit() {
  }

}

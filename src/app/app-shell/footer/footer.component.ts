import { Component, OnInit } from '@angular/core';
import { toc } from '../../core/toc';

@Component({
  selector: 'k9-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public terms = toc;

  constructor() { }

  ngOnInit() {
  }

}

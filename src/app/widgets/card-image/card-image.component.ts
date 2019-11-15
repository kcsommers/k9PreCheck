import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'k9-card-image',
  templateUrl: './card-image.component.html',
  styleUrls: ['./card-image.component.scss']
})
export class CardImageComponent implements OnInit {
  @Input()
  public src: string;

  @Input()
  public alt: string;

  @Input()
  public label: string;

  @Input()
  public details: string[];

  constructor() { }

  ngOnInit() {
  }

}

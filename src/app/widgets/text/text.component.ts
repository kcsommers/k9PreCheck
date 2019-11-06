import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'k9-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {
  @Input()
  public content: string;

  @Input()
  public fontSize = '1rem';

  @Input()
  public color = '#242424';

  @Input()
  public fontWeight = 'normal';

  public paragraphs: string[];

  constructor() { }

  ngOnInit() {
    if (this.content) {
      this.paragraphs = this.content.split('\n');
    }
  }

}

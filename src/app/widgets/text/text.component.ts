import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';

@Component({
  selector: 'k9-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit, OnChanges {
  @Input()
  public content: string;

  @Input()
  public fontSize = '1rem';

  @Input()
  public color = '#242424';

  @Input()
  public fontWeight = 'normal';

  @Input()
  public lineHeight = '1.25rem';

  @Input()
  public useEllipsis = false;

  @Input()
  public title: string;

  public paragraphs: string[];

  constructor() { }

  ngOnInit() {
    this.formatContent();
  }

  ngOnChanges() {
    this.formatContent();
  }

  private formatContent() {
    if (this.content && typeof this.content === 'string') {
      this.paragraphs = this.content.split('\n');
    }
  }

  public getStyles() {
    const styles = {
      fontSize: this.fontSize,
      color: this.color,
      fontWeight: this.fontWeight,
      lineHeight: this.lineHeight
    };
    const overflowStyles = {
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    };
    return !this.useEllipsis ? styles : Object.assign(styles, overflowStyles);
  }

}

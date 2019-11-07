import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'k9-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input()
  public searchError$: BehaviorSubject<boolean>;

  @Input()
  public data$: BehaviorSubject<any>;

  @Input()
  public fetching$: BehaviorSubject<boolean>;

  @Output()
  public search = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }
}

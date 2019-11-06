import { Component, OnInit, EventEmitter, Output, HostListener, ElementRef, OnDestroy, Input } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'k9-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit, OnDestroy {
  @Input()
  public placeholder: string;

  @Output()
  public search = new EventEmitter<string>();

  public searchTerm = '';

  private _focused = false;

  private _listener: Subscription;

  public get focused(): boolean {
    return this._focused;
  }

  public set focused(isFocused: boolean) {
    this._focused = isFocused;
    if (isFocused) {
      this.listen();
    } else {
      this._listener.unsubscribe();
    }
  }

  constructor(private _el: ElementRef) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this._listener && this._focused) {
      this._listener.unsubscribe();
    }
  }

  public doSearch() {
    this.search.emit(this.searchTerm);
  }

  public listen() {
    this._listener = fromEvent(this._el.nativeElement, 'keypress').subscribe((e: KeyboardEvent) => {
      if (this.searchTerm && e.keyCode === 13) {
        this.doSearch();
      }
    });
  }

}

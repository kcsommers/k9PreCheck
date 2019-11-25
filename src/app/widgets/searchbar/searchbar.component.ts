import { Component, OnInit, EventEmitter, Output, HostListener, ElementRef, OnDestroy, Input } from '@angular/core';
import { fromEvent, Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'k9-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit, OnDestroy {
  @Input()
  public searchError$: BehaviorSubject<boolean>;

  @Input()
  public placeholder: string;

  @Input()
  public buttonText = 'FIND';

  @Output()
  public search = new EventEmitter<string>();

  @Output()
  public clear = new EventEmitter<boolean>();

  public searchTerm = '';

  private _focused = false;

  private _listener: Subscription;

  private _currentSearchTerm: string;

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

  public get formValid() {
    return !!(this.searchTerm);
  }

  constructor(private _el: ElementRef) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this._listener && this._focused) {
      this._listener.unsubscribe();
    }
  }

  public searchTermChange(value: string) {
    if (this._currentSearchTerm) {
      if (this._currentSearchTerm !== value) {
        this.buttonText = 'FIND';
      } else {
        this.buttonText = 'CLEAR';
      }
    }
  }

  public doSearch() {
    this._currentSearchTerm = this.searchTerm;
    this.search.emit(this.searchTerm);
  }

  public doClear() {
    this._currentSearchTerm = '';
    this.searchTerm = '';
    this.buttonText = 'FIND';
    this.clear.emit(true);

  }

  public listen() {
    this._listener = fromEvent(this._el.nativeElement, 'keypress').subscribe((e: KeyboardEvent) => {
      if (this.searchTerm && e.code === 'Enter') {
        this.doSearch();
      }
    });
  }

}

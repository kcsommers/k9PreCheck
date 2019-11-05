import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'k9-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  @Output()
  public search = new EventEmitter<string>();

  public searchTerm = '';
  constructor() { }

  ngOnInit() {
  }

  public doSearch(term: string) {
    this.search.emit(term);
  }

}

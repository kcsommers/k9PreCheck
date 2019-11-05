import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { FormsModule } from '@angular/forms';

const widgets = [
  CardComponent,
  SearchbarComponent
]

@NgModule({
  declarations: widgets,
  imports: [
    FormsModule
  ],
  exports: widgets,
  providers: []
})
export class WidgetsModule { }

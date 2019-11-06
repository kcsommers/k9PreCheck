import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { FormsModule } from '@angular/forms';
import { TextComponent } from './text/text.component';
import { CommonModule } from '@angular/common';

const widgets = [
  CardComponent,
  SearchbarComponent,
  TextComponent
];

@NgModule({
  declarations: widgets,
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: widgets,
  providers: []
})
export class WidgetsModule { }

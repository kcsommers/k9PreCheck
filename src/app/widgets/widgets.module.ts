import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { FormsModule } from '@angular/forms';
import { TextComponent } from './text/text.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardImageComponent } from './card-image/card-image.component';
import { CardDetailsComponent } from './card-details/card-details.component';

const widgets = [
  CardComponent,
  SearchbarComponent,
  TextComponent,
  SpinnerComponent,
  CardImageComponent,
  CardDetailsComponent
];

@NgModule({
  declarations: widgets,
  imports: [
    FormsModule,
    CommonModule,
    FontAwesomeModule
  ],
  exports: widgets,
  providers: []
})
export class WidgetsModule { }

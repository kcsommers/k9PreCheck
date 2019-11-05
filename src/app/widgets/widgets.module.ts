import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';

const widgets = [
  CardComponent
]

@NgModule({
  declarations: widgets,
  imports: [
  ],
  exports: widgets,
  providers: []
})
export class WidgetsModule { }

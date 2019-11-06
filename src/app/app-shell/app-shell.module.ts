import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { WidgetsModule } from '../widgets/widgets.module';
import { CommonModule } from '@angular/common';

const components = [
  FooterComponent,
  HeaderComponent
]

@NgModule({
  declarations: components,
  imports: [
    WidgetsModule,
    CommonModule
  ],
  exports: components,
  providers: []
})
export class AppShellModule { }

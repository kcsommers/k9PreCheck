import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { WidgetsModule } from '../widgets/widgets.module';

const components = [
  FooterComponent,
  HeaderComponent
]

@NgModule({
  declarations: components,
  imports: [
    WidgetsModule
  ],
  exports: components,
  providers: []
})
export class AppShellModule { }

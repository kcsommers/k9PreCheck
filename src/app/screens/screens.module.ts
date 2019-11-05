import { NgModule } from '@angular/core';
import { ScreensRoutingModule } from './screens-routing.module';
import { LandingScreenComponent } from './landing-screen/landing-screen.component';
import { WidgetsModule } from '../widgets/widgets.module';

const screens = [
  LandingScreenComponent
]

@NgModule({
  declarations: screens,
  imports: [
    ScreensRoutingModule,
    WidgetsModule
  ],
  exports: screens,
  providers: []
})
export class ScreensModule { }

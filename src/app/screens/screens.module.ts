import { NgModule } from '@angular/core';
import { ScreensRoutingModule } from './screens-routing.module';
import { LandingScreenComponent } from './landing-screen/landing-screen.component';

const screens = [
  LandingScreenComponent
]

@NgModule({
  declarations: screens,
  imports: [
    ScreensRoutingModule
  ],
  exports: screens,
  providers: []
})
export class ScreensModule { }

import { NgModule } from '@angular/core';
import { ScreensRoutingModule } from './screens-routing.module';
import { LandingScreenComponent } from './landing-screen/landing-screen.component';
import { WidgetsModule } from '../widgets/widgets.module';
import { AppShellModule } from '../app-shell/app-shell.module';

const screens = [
  LandingScreenComponent
]

@NgModule({
  declarations: screens,
  imports: [
    ScreensRoutingModule,
    WidgetsModule,
    AppShellModule
  ],
  exports: screens,
  providers: []
})
export class ScreensModule { }

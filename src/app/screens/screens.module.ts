import { NgModule } from '@angular/core';
import { ScreensRoutingModule } from './screens-routing.module';
import { LandingScreenComponent } from './landing-screen/landing-screen.component';
import { WidgetsModule } from '../widgets/widgets.module';
import { AppShellModule } from '../app-shell/app-shell.module';
import { CommonModule } from '@angular/common';

const screens = [
  LandingScreenComponent
]

@NgModule({
  declarations: screens,
  imports: [
    ScreensRoutingModule,
    WidgetsModule,
    AppShellModule,
    CommonModule
  ],
  exports: screens,
  providers: []
})
export class ScreensModule { }

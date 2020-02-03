import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  SkyDockModule
} from '../dock.module';

@NgModule({
  imports: [
    CommonModule,
    SkyDockModule
  ]
})
export class DockFixturesModule { }

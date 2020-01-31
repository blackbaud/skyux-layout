import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  SkyDynamicComponentModule
} from '@skyux/core';

import {
  SkyDockComponent
} from './dock.component';

import {
  SkyDockService
} from './dock.service';

@NgModule({
  imports: [
    CommonModule,
    SkyDynamicComponentModule
  ],
  declarations: [
    SkyDockComponent
  ],
  entryComponents: [
    SkyDockComponent
  ],
  providers: [
    SkyDockService
  ]
})
export class SkyDockModule { }

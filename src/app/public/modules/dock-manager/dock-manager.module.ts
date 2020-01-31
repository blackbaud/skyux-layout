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
  SkyDockManagerService
} from './dock-manager.service';

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
    SkyDockManagerService
  ]
})
export class SkyDockManagerModule { }

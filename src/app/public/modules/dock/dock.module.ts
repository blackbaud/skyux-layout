import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  MutationObserverService,
  SkyDynamicComponentModule
} from '@skyux/core';

import {
  SkyDockComponent
} from './dock.component';

import {
  SkyDockService
} from './dock.service';

/**
 * @deprecated Use `SkyDockModule` from `@skyux/core` instead.
 */
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
    MutationObserverService,
    SkyDockService
  ]
})
export class SkyDockModule { }

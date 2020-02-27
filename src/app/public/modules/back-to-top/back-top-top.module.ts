import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  SkyAppConfig
} from '@skyux/config';

import {
  SkyAppWindowRef,
  SkyDockModule
} from '@skyux/core';

import {
  SkyI18nModule
} from '@skyux/i18n';

import {
  SkyLayoutResourcesModule
} from '../shared';

import {
  SkyBackToTopDirective
} from './back-to-top.directive';

import {
  SkyBackToTopComponent
} from './back-to-top.component';

@NgModule({
  declarations: [
    SkyBackToTopComponent,
    SkyBackToTopDirective
  ],
  providers: [
    SkyAppConfig,
    SkyAppWindowRef
  ],
  imports: [
    CommonModule,
    SkyDockModule,
    SkyI18nModule,
    SkyLayoutResourcesModule
  ],
  exports: [
    SkyBackToTopComponent,
    SkyBackToTopDirective
  ],
  entryComponents: [
    SkyBackToTopComponent
  ]
})
export class SkyBackToTopModule { }

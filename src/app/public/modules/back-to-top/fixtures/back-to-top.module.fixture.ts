import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  RouterTestingModule
} from '@angular/router/testing';

import {
  SkyModalModule
} from '@skyux/modals';

import {
  SkyBackToTopFixtureComponent
} from './back-to-top.component.fixture';

import {
  SkyBackToTopModule
} from '../back-top-top.module';

import {
  SkyBackToTopModalFixtureComponent
} from './back-to-top-modal.component.fixture';

@NgModule({
  imports: [
    CommonModule,
    RouterTestingModule,
    SkyBackToTopModule,
    SkyModalModule
  ],
  exports: [
    SkyBackToTopFixtureComponent,
    SkyBackToTopModalFixtureComponent
  ],
  declarations: [
    SkyBackToTopFixtureComponent,
    SkyBackToTopModalFixtureComponent
  ],
  entryComponents: [
    SkyBackToTopModalFixtureComponent
  ]
})
export class SkyBackToTopFixturesModule { }

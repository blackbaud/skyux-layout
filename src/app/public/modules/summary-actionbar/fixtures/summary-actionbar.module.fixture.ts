import {
  NgModule
} from '@angular/core';

import {
  BrowserModule
} from '@angular/platform-browser';

import {
  NoopAnimationsModule
} from '@angular/platform-browser/animations';

import {
  RouterTestingModule
} from '@angular/router/testing';

import {
  SkyKeyInfoModule
} from '@skyux/indicators';

import {
  SkyModalModule
} from '@skyux/modals';

import {
  SkySummaryActionbarModalTestComponent
} from './summary-actionbar-modal.component.fixture';

import {
  SkySummaryActionbarModule
} from '../summary-actionbar.module';

import {
  SkySummaryActionbarTestComponent
} from './summary-actionbar.component.fixture';

@NgModule({
  declarations: [
    SkySummaryActionbarTestComponent,
    SkySummaryActionbarModalTestComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    RouterTestingModule,
    SkyKeyInfoModule,
    SkyModalModule,
    SkySummaryActionbarModule
  ],
  exports: [
    BrowserModule,
    RouterTestingModule,
    SkyModalModule,
    SkyKeyInfoModule,
    SkySummaryActionbarModule
  ],
  entryComponents: [
    SkySummaryActionbarModalTestComponent
  ]
})
export class SkySummaryActionbarFixtureModule { }

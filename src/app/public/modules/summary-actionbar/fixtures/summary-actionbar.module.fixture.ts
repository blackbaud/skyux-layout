import {
  NgModule
} from '@angular/core';

import { SkySummaryActionbarModule } from '../summary-actionbar.module';
import { BrowserModule } from '@angular/platform-browser';
import { SkyKeyInfoModule } from '@skyux/indicators';
import { SkySummaryActionbarTestComponent } from './summary-actionbar.component.fixture';
import { SkySummaryActionbarModalTestComponent } from './summary-actionbar-modal.component.fixture';
import { SkyModalModule } from '@skyux/modals';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    SkySummaryActionbarTestComponent,
    SkySummaryActionbarModalTestComponent
  ],
  imports: [
    BrowserModule,
    RouterTestingModule,
    NoopAnimationsModule,
    SkySummaryActionbarModule,
    SkyKeyInfoModule,
    SkyModalModule
  ],
  exports: [
    BrowserModule,
    RouterTestingModule,
    SkySummaryActionbarModule,
    SkyKeyInfoModule,
    SkyModalModule
  ],
  entryComponents: [
    SkySummaryActionbarModalTestComponent
  ]
})
export class SkySummaryActionbarFixtureModule { }

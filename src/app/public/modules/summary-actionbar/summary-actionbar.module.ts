import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';

import {
  SkyMediaQueryModule
} from '@skyux/core';

import {
  SkyI18nModule
} from '@skyux/i18n';

import {
  SkyIconModule,
  SkyChevronModule
} from '@skyux/indicators';

import {
  SkyDropdownModule
} from '@skyux/popovers';

import {
  SkyLayoutResourcesModule
} from '../shared';

import {
  SkySummaryActionbarComponent
} from './summary-actionbar.component';

import {
  SkySummaryActionbarActionsComponent,
  SkySummaryActionbarCancelComponent,
  SkySummaryActionbarPrimaryActionComponent,
  SkySummaryActionbarSecondaryActionComponent,
  SkySummaryActionbarSecondaryActionsComponent
} from './actions';

import {
  SkySummaryActionbarSummaryComponent
} from './summary';

import {
  SkySummaryActionbarAdapterService
} from './summary-actionbar-adapter.service';

@NgModule({
  declarations: [
    SkySummaryActionbarActionsComponent,
    SkySummaryActionbarCancelComponent,
    SkySummaryActionbarComponent,
    SkySummaryActionbarPrimaryActionComponent,
    SkySummaryActionbarSecondaryActionComponent,
    SkySummaryActionbarSecondaryActionsComponent,
    SkySummaryActionbarSummaryComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    SkyChevronModule,
    SkyDropdownModule,
    SkyI18nModule,
    SkyIconModule,
    SkyLayoutResourcesModule,
    SkyMediaQueryModule
  ],
  providers: [
    SkySummaryActionbarAdapterService
  ],
  exports: [
    SkySummaryActionbarComponent,
    SkySummaryActionbarActionsComponent,
    SkySummaryActionbarCancelComponent,
    SkySummaryActionbarPrimaryActionComponent,
    SkySummaryActionbarSecondaryActionComponent,
    SkySummaryActionbarSecondaryActionsComponent,
    SkySummaryActionbarSummaryComponent
  ]
})
export class SkySummaryActionbarModule { }

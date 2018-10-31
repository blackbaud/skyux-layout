import {
  NgModule
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  SkySummaryActionbarComponent
} from './summary-actionbar.component';
import {
  SkySummaryActionbarPrimaryActionComponent,
  SkySummaryActionbarActionsComponent,
  SkySummaryActionbarCancelComponent,
  SkySummaryActionbarSecondaryActionsComponent,
  SkySummaryActionbarSecondaryActionComponent
} from './actions';
import {
  SkyIconModule
} from '@skyux/indicators/modules/icon';
import {
  SkyI18nModule
} from '@skyux/i18n/modules/i18n';
import { CommonModule } from '@angular/common';
import {
  SkySummaryActionbarSummaryComponent
} from './summary';
import {
  SkyDropdownModule
} from '@skyux/popovers/modules/dropdown';
import { SkyMediaQueryModule } from '@skyux/core/modules/media-query';
import { SkySummaryActionbarAdapterService } from './summary-actionbar-adapter.service';
import { SkyLayoutResourcesModule } from '../shared';

@NgModule({
  declarations: [
    SkySummaryActionbarComponent,
    SkySummaryActionbarPrimaryActionComponent,
    SkySummaryActionbarActionsComponent,
    SkySummaryActionbarSummaryComponent,
    SkySummaryActionbarCancelComponent,
    SkySummaryActionbarSecondaryActionsComponent,
    SkySummaryActionbarSecondaryActionComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    SkyI18nModule,
    SkyIconModule,
    SkyDropdownModule,
    SkyMediaQueryModule,
    SkyLayoutResourcesModule
  ],
  providers: [
    SkySummaryActionbarAdapterService
  ],
  exports: [
    SkySummaryActionbarComponent,
    SkySummaryActionbarPrimaryActionComponent,
    SkySummaryActionbarActionsComponent,
    SkySummaryActionbarSummaryComponent,
    SkySummaryActionbarCancelComponent,
    SkySummaryActionbarSecondaryActionsComponent,
    SkySummaryActionbarSecondaryActionComponent
  ]
})
export class SkySummaryActionbarModule { }

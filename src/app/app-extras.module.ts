import {
  NgModule
} from '@angular/core';

import {
  NoopAnimationsModule
} from '@angular/platform-browser/animations';

import {
  SkyActionButtonModule,
  SkyCardModule,
  SkyDefinitionListModule,
  SkyFluidGridModule,
  SkyPageSummaryModule,
  SkySummaryActionbarModule,
  SkyTextExpandModule,
  SkyTextExpandRepeaterModule,
  SkyToolbarModule
 } from './public';

 import {
   SkyAvatarModule
 } from '@skyux/avatar';

 import {
   SkyAlertModule,
   SkyKeyInfoModule,
   SkyLabelModule
 } from '@skyux/indicators';

import {
  SkyModalModule
} from '@skyux/modals';

import {
  SkySummaryActionbarModalDemoComponent
} from './visual/summary-actionbar/summary-actionbar-modal-demo.component';

@NgModule({
  imports: [
    SkyActionButtonModule,
    SkyAlertModule,
    SkyAvatarModule,
    SkyCardModule,
    SkyDefinitionListModule,
    SkyFluidGridModule,
    SkyKeyInfoModule,
    SkyModalModule,
    SkyPageSummaryModule,
    SkySummaryActionbarModule,
    SkyTextExpandModule,
    SkyTextExpandRepeaterModule,
    SkyToolbarModule,
    NoopAnimationsModule
  ],
  exports: [
    SkyActionButtonModule,
    SkyAlertModule,
    SkyAvatarModule,
    SkyCardModule,
    SkyDefinitionListModule,
    SkyFluidGridModule,
    SkyKeyInfoModule,
    SkyLabelModule,
    SkyModalModule,
    SkyPageSummaryModule,
    SkySummaryActionbarModule,
    SkyTextExpandModule,
    SkyTextExpandRepeaterModule,
    SkyToolbarModule,
    NoopAnimationsModule
  ],
  providers: [],
  entryComponents: [SkySummaryActionbarModalDemoComponent]
})
export class AppExtrasModule { }

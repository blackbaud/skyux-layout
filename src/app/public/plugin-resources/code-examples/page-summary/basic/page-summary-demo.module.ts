import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  SkyPageSummaryModule
} from '@skyux/layout';

import {
  PageSummaryDemoComponent
} from './page-summary-demo.component';

@NgModule({
  imports: [
    CommonModule,
    SkyPageSummaryModule
  ],
  declarations: [
    PageSummaryDemoComponent
  ],
  exports: [
    PageSummaryDemoComponent
  ]
})
export class PageSummaryDemoModule { }

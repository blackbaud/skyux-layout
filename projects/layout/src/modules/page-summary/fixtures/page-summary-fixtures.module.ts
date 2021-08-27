import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  NoopAnimationsModule
} from '@angular/platform-browser/animations';

import {
  SkyLayoutForRootCompatModule
} from '../../shared/layout-for-root-compat.module';

import {
  SkyPageSummaryModule
} from '../page-summary.module';

import {
  SkyPageSummaryTestComponent
} from './page-summary.component.fixture';

@NgModule({
  declarations: [
    SkyPageSummaryTestComponent
  ],
  imports: [
    CommonModule,
    NoopAnimationsModule,
    SkyLayoutForRootCompatModule,
    SkyPageSummaryModule
  ],
  exports: [
    SkyPageSummaryTestComponent
  ]
})
export class SkyPageSummaryFixturesModule { }

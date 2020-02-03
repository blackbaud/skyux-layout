import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  InlineDeleteTestComponent
} from './inline-delete.component.fixture';

import {
  SkyInlineDeleteModule
} from '..';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    InlineDeleteTestComponent
  ],
  imports: [
    CommonModule,
    SkyInlineDeleteModule,
    NoopAnimationsModule
  ],
  exports: [
    InlineDeleteTestComponent
  ]
})
export class SkyInlineDeleteFixturesModule { }

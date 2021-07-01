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
  SkyLayoutForRootCompatModule
} from '../../shared/layout-for-root-compat.module';

import {
  SkyActionButtonModule
} from '../action-button.module';

import {
  ActionButtonNgforTestComponent
} from './action-button-ngfor.component.fixture';

import {
  ActionButtonTestComponent
} from './action-button.component.fixture';

@NgModule({
  declarations: [
    ActionButtonTestComponent,
    ActionButtonNgforTestComponent
  ],
  imports: [
    CommonModule,
    RouterTestingModule,
    SkyActionButtonModule,
    SkyLayoutForRootCompatModule
  ]
})
export class SkyActionButtonFixturesModule { }

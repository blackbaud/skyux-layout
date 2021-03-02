import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  RouterModule
} from '@angular/router';

import {
  SkyMediaQueryModule
} from '@skyux/core';

import {
  SkyIconModule
} from '@skyux/indicators';

import {
  SkyFlexModule
} from '@skyux/layout';

import {
  SkyActionButtonContainerComponent
} from './action-button-container.component';

import {
  SkyActionButtonDetailsComponent
} from './action-button-details.component';

import {
  SkyActionButtonHeaderComponent
} from './action-button-header.component';

import {
  SkyActionButtonIconComponent
} from './action-button-icon.component';

import {
  SkyActionButtonComponent
} from './action-button.component';

@NgModule({
  declarations: [
    SkyActionButtonComponent,
    SkyActionButtonContainerComponent,
    SkyActionButtonDetailsComponent,
    SkyActionButtonHeaderComponent,
    SkyActionButtonIconComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SkyFlexModule,
    SkyIconModule,
    SkyMediaQueryModule
  ],
  exports: [
    SkyActionButtonComponent,
    SkyActionButtonContainerComponent,
    SkyActionButtonDetailsComponent,
    SkyActionButtonHeaderComponent,
    SkyActionButtonIconComponent
  ]
})
export class SkyActionButtonModule { }

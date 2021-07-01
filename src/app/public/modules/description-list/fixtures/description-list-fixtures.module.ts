import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  SkyThemeService
} from '@skyux/theme';

import {
  SkyLayoutForRootCompatModule
} from '../../shared/layout-for-root-compat.module';

import {
  SkyDescriptionListTestComponent
} from './description-list.component.fixture';

import {
  SkyDescriptionListModule
} from '../description-list.module';

@NgModule({
  declarations: [
    SkyDescriptionListTestComponent
  ],
  imports: [
    CommonModule,
    SkyDescriptionListModule,
    SkyLayoutForRootCompatModule
  ],
  exports: [
    SkyDescriptionListTestComponent
  ],
  providers: [
    SkyThemeService
  ]
})
export class SkyDescriptionListFixturesModule { }

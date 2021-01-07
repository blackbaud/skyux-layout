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
  SkyDefinitionListTestComponent
} from './definition-list.component.fixture';

import {
  SkyDefinitionListModule
} from '../definition-list.module';

@NgModule({
  declarations: [
    SkyDefinitionListTestComponent
  ],
  imports: [
    CommonModule,
    SkyDefinitionListModule
  ],
  exports: [
    SkyDefinitionListTestComponent
  ],
  providers: [
    SkyThemeService
  ]
})
export class SkyDefinitionListFixturesModule { }

import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  SkyDefinitionListAdapterService
} from '../definition-list-adapter-service';

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
    SkyDefinitionListAdapterService
  ]
})
export class SkyDefinitionListFixturesModule { }

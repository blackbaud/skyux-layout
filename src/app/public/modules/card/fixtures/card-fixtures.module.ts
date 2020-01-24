import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  SkyCardModule
} from '../';

import {
  CardTestComponent
} from './card.component.fixture';

import {
  SkyInlineDeleteModule
} from '../../inline-delete';

@NgModule({
  declarations: [
    CardTestComponent
  ],
  imports: [
    CommonModule,
    SkyCardModule,
    SkyInlineDeleteModule
  ],
  exports: [
    CardTestComponent
  ]
})
export class SkyCardFixturesModule { }

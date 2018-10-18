import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyI18nModule } from '@skyux/i18n';

import {
  SkyLayoutResourcesModule
} from '../shared';

import { SkyTextExpandRepeaterComponent } from './text-expand-repeater.component';

@NgModule({
  declarations: [
    SkyTextExpandRepeaterComponent
  ],
  imports: [
    SkyI18nModule,
    SkyLayoutResourcesModule,
    CommonModule
  ],
  exports: [
    SkyTextExpandRepeaterComponent
  ]
})
export class SkyTextExpandRepeaterModule { }

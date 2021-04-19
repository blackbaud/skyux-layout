import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  SkyDataManagerModule
} from '@skyux/data-manager';

import {
  SkyCheckboxModule
} from '@skyux/forms';

import {
  SkyI18nModule
} from '@skyux/i18n';

import {
  SkyInlineDeleteModule
} from '../inline-delete/inline-delete.module';

import {
  SkyLayoutResourcesModule
} from '../shared/layout-resources.module';

import {
  SkyCardActionsComponent
} from './card-actions.component';

import {
  SkyCardContentComponent
} from './card-content.component';

import {
  SkyCardTitleComponent
} from './card-title.component';

import {
  SkyCardComponent
} from './card.component';

@NgModule({
  declarations: [
    SkyCardActionsComponent,
    SkyCardComponent,
    SkyCardContentComponent,
    SkyCardTitleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SkyCheckboxModule,
    SkyDataManagerModule,
    SkyI18nModule,
    SkyLayoutResourcesModule,
    SkyInlineDeleteModule
  ],
  exports: [
    SkyCardActionsComponent,
    SkyCardComponent,
    SkyCardContentComponent,
    SkyCardTitleComponent
  ]
})
export class SkyCardModule { }

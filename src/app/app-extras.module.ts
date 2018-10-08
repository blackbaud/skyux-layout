import {
  NgModule
} from '@angular/core';

import {
  SkyActionButtonModule
} from './public/modules/action-button';
import {
  SkyToolbarModule
 } from './public/modules/toolbar';

@NgModule({
  imports: [
    SkyActionButtonModule,
    SkyToolbarModule
  ],
  exports: [
    SkyActionButtonModule,
    SkyToolbarModule
  ],
  providers: [],
  entryComponents: []
})
export class AppExtrasModule { }

//#region imports

import {
  NgModule
} from '@angular/core';

import {
  SkyPageComponent
} from './page.component';

//#endregion

@NgModule({
  declarations: [
    SkyPageComponent
  ],
  exports: [
    SkyPageComponent
  ]
})
export class SkyPageModule { }

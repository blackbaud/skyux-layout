import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';
import { SkyThemeModule } from '@skyux/theme';
import { SkyBoxContentSectionComponent } from './box-content-section.component';
import { SkyBoxControlsComponent } from './box-controls.component';
import { SkyBoxHeaderComponent } from './box-header.component';
import { SkyBoxComponent } from './box.component';

@NgModule({
  declarations: [
    SkyBoxComponent,
    SkyBoxHeaderComponent,
    SkyBoxContentSectionComponent,
    SkyBoxControlsComponent
  ],
  imports: [
    CommonModule,
    SkyThemeModule
  ],
  exports: [
    SkyBoxComponent,
    SkyBoxHeaderComponent,
    SkyBoxContentSectionComponent,
    SkyBoxControlsComponent
  ]
})
export class SkyBoxModule { }

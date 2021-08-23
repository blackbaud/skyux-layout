import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SkyDocsToolsModule } from '@skyux/docs-tools';

import { SkyActionButtonModule } from 'projects/layout/src/public-api';

import { VisualComponent } from './visual.component';
import { ActionButtonVisualComponent } from './action-button/action-button-visual.component';

@NgModule({
  declarations: [
    ActionButtonVisualComponent,
    VisualComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SkyActionButtonModule,
    SkyDocsToolsModule
  ]
})
export class VisualModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SkyViewkeeperModule } from '@skyux/core';
import { SkyIconModule } from '@skyux/indicators';

import {
  SkyActionButtonModule,
  SkyBackToTopModule,
  SkyCardModule,
  SkyDefinitionListModule,
  SkyDescriptionListModule,
  SkyFluidGridModule,
  SkyFormatModule,
  SkyInlineDeleteModule,
  SkyPageSummaryModule,
  SkyTextExpandModule,
  SkyTextExpandRepeaterModule,
  SkyToolbarModule,
} from 'projects/layout/src/public-api';

import { VisualComponent } from './visual.component';
import { ActionButtonVisualComponent } from './action-button/action-button-visual.component';
import { ToolbarVisualComponent } from './toolbar/toolbar-visual.component';
import { TextExpandVisualComponent } from './text-expand/text-expand-visual.component';
import { TextExpandRepeaterVisualComponent } from './text-expand-repeater/text-expand-repeater-visual.component';
import { FormsModule } from '@angular/forms';
import { PageSummaryVisualComponent } from './page-summary/page-summary-visual.component';
import { InlineDeleteVisualComponent } from './inline-delete/inline-delete-visual.component';
import { FormatVisualComponent } from './format/format-visual.component';
import { FluidGridVisualComponent } from './fluid-grid/fluid-grid-visual.component';
import { DescriptionListVisualComponent } from './description-list/description-list-visual.component';
import { DefinitionListVisualComponent } from './definition-list/definition-list-visual.component';
import { CardVisualComponent } from './card/card-visual.component';
import { BackToTopVisualComponent } from './back-to-top/back-to-top-visual.component';
import { BackToTopScrollableParentVisualComponent } from './back-to-top-scrollable-parent/back-to-top-scrollable-parent-visual.component';
import { BackToTopMessageStreamVisualComponent } from './back-to-top-message-stream/back-to-top-message-stream-visual.component';
import { SkyE2eThemeSelectorModule } from '@skyux/e2e-client';
import { BoxVisualComponent } from './box/box-visual.component';
import { SkyBoxModule } from 'projects/layout/src/modules/box/box.module';

@NgModule({
  declarations: [
    ActionButtonVisualComponent,
    BackToTopMessageStreamVisualComponent,
    BackToTopScrollableParentVisualComponent,
    BackToTopVisualComponent,
    BoxVisualComponent,
    CardVisualComponent,
    DefinitionListVisualComponent,
    DescriptionListVisualComponent,
    FluidGridVisualComponent,
    FormatVisualComponent,
    InlineDeleteVisualComponent,
    PageSummaryVisualComponent,
    TextExpandRepeaterVisualComponent,
    TextExpandVisualComponent,
    ToolbarVisualComponent,
    VisualComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SkyActionButtonModule,
    SkyBackToTopModule,
    SkyBoxModule,
    SkyCardModule,
    SkyDefinitionListModule,
    SkyDescriptionListModule,
    SkyE2eThemeSelectorModule,
    SkyFluidGridModule,
    SkyFormatModule,
    SkyIconModule,
    SkyInlineDeleteModule,
    SkyPageSummaryModule,
    SkyTextExpandModule,
    SkyTextExpandRepeaterModule,
    SkyToolbarModule,
    SkyViewkeeperModule,
  ],
})
export class VisualModule {}

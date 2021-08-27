import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionButtonVisualComponent } from './visual/action-button/action-button-visual.component';
import { BackToTopMessageStreamVisualComponent } from './visual/back-to-top-message-stream/back-to-top-message-stream-visual.component';
import { BackToTopScrollableParentVisualComponent } from './visual/back-to-top-scrollable-parent/back-to-top-scrollable-parent-visual.component';
import { BackToTopVisualComponent } from './visual/back-to-top/back-to-top-visual.component';
import { CardVisualComponent } from './visual/card/card-visual.component';
import { DefinitionListVisualComponent } from './visual/definition-list/definition-list-visual.component';
import { DescriptionListVisualComponent } from './visual/description-list/description-list-visual.component';
import { FluidGridVisualComponent } from './visual/fluid-grid/fluid-grid-visual.component';
import { FormatVisualComponent } from './visual/format/format-visual.component';
import { InlineDeleteVisualComponent } from './visual/inline-delete/inline-delete-visual.component';
import { PageSummaryVisualComponent } from './visual/page-summary/page-summary-visual.component';
import { PageChildVisualComponent } from './visual/page/page-visual.component';
import { TextExpandRepeaterVisualComponent } from './visual/text-expand-repeater/text-expand-repeater-visual.component';
import { TextExpandVisualComponent } from './visual/text-expand/text-expand-visual.component';
import { ToolbarVisualComponent } from './visual/toolbar/toolbar-visual.component';
import { VisualComponent } from './visual/visual.component';

const routes: Routes = [
  {
    path: '',
    component: VisualComponent
  },
  {
    path: 'visual/action-button',
    component: ActionButtonVisualComponent
  },
  {
    path: 'visual/back-to-top',
    component: BackToTopVisualComponent
  },
  {
    path: 'visual/back-to-top-message-stream',
    component: BackToTopMessageStreamVisualComponent
  },
  {
    path: 'visual/back-to-top-scrollable-parent',
    component: BackToTopScrollableParentVisualComponent
  },
  {
    path: 'visual/card',
    component: CardVisualComponent
  },
  {
    path: 'visual/definition-list',
    component: DefinitionListVisualComponent
  },
  {
    path: 'visual/description-list',
    component: DescriptionListVisualComponent
  },
  {
    path: 'visual/fluid-grid',
    component: FluidGridVisualComponent
  },
  {
    path: 'visual/format',
    component: FormatVisualComponent
  },
  {
    path: 'visual/inline-delete',
    component: InlineDeleteVisualComponent
  },
  {
    path: 'visual/page',
    component: PageChildVisualComponent
  },
  {
    path: 'visual/page-summary',
    component: PageSummaryVisualComponent
  },
  {
    path: 'visual/page-summary',
    component: PageSummaryVisualComponent
  },
  {
    path: 'visual/text-expand',
    component: TextExpandVisualComponent
  },
  {
    path: 'visual/text-expand-repeater',
    component: TextExpandRepeaterVisualComponent
  },
  {
    path: 'visual/toolbar',
    component: ToolbarVisualComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

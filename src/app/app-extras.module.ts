import {
  NgModule
} from '@angular/core';

import {
  SkyAvatarModule
} from '@skyux/avatar';

import {
  SkyDocsToolsModule,
  SkyDocsToolsOptions
} from '@skyux/docs-tools';

import {
  SkyAlertModule,
  SkyKeyInfoModule,
  SkyLabelModule,
  SkyIconModule
} from '@skyux/indicators';

import {
  SkyAppLinkModule
} from '@skyux/router';

import {
  SkyGridModule
} from '@skyux/grids';

import {
  SkyActionButtonModule,
  SkyBackToTopModule,
  SkyCardModule,
  SkyDefinitionListModule,
  SkyDockModule,
  SkyFluidGridModule,
  SkyInlineDeleteModule,
  SkyPageModule,
  SkyPageSummaryModule,
  SkyTextExpandModule,
  SkyTextExpandRepeaterModule,
  SkyToolbarModule
} from './public';

import {
  DockItemVisualComponent
} from './visual/dock/dock-item-visual.component';

@NgModule({
  exports: [
    SkyActionButtonModule,
    SkyAlertModule,
    SkyAppLinkModule,
    SkyAvatarModule,
    SkyBackToTopModule,
    SkyCardModule,
    SkyDefinitionListModule,
    SkyDockModule,
    SkyGridModule,
    SkyDocsToolsModule,
    SkyFluidGridModule,
    SkyIconModule,
    SkyKeyInfoModule,
    SkyLabelModule,
    SkyPageModule,
    SkyPageSummaryModule,
    SkyTextExpandModule,
    SkyTextExpandRepeaterModule,
    SkyToolbarModule,
    SkyInlineDeleteModule
  ],
  entryComponents: [
    DockItemVisualComponent
  ],
  providers: [
    {
      provide: SkyDocsToolsOptions,
      useValue: {
        gitRepoUrl: 'https://github.com/blackbaud/skyux-layout',
        packageName: '@skyux/layout'
      }
    }
  ]
})
export class AppExtrasModule { }

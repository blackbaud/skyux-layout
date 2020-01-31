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
  SkyActionButtonModule,
  SkyCardModule,
  SkyDefinitionListModule,
  SkyDockManagerModule,
  SkyFluidGridModule,
  SkyInlineDeleteModule,
  SkyPageModule,
  SkyPageSummaryModule,
  SkyTextExpandModule,
  SkyTextExpandRepeaterModule,
  SkyToolbarModule
 } from './public';
import { DockManagerItemVisualComponent } from './visual/dock-manager/dock-manager-item-visual.component';

@NgModule({
  exports: [
    SkyActionButtonModule,
    SkyAlertModule,
    SkyAppLinkModule,
    SkyAvatarModule,
    SkyCardModule,
    SkyDefinitionListModule,
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
    SkyInlineDeleteModule,
    SkyDockManagerModule
  ],
  providers: [
    {
      provide: SkyDocsToolsOptions,
      useValue: {
        gitRepoUrl: 'https://github.com/blackbaud/skyux-layout',
        packageName: '@skyux/layout'
      }
    }
  ],
  entryComponents: [
    DockManagerItemVisualComponent
  ]
})
export class AppExtrasModule { }

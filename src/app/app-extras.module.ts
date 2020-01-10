import {
  NgModule
} from '@angular/core';

import {
  NoopAnimationsModule
} from '@angular/platform-browser/animations';

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
  SkyFluidGridModule,
  SkyPageSummaryModule,
  SkyTextExpandModule,
  SkyTextExpandRepeaterModule,
  SkyToolbarModule
 } from './public';

import {
  SkyInlineDeleteModule
} from './public/modules/inline-delete/inline-delete.module';

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
    SkyPageSummaryModule,
    SkyTextExpandModule,
    SkyTextExpandRepeaterModule,
    SkyToolbarModule,
    SkyInlineDeleteModule
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

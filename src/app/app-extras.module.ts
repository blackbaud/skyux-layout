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
  SkyAuthHttpClientModule
} from '@skyux/http';

import {
  SkyAlertModule,
  SkyKeyInfoModule,
  SkyLabelModule,
  SkyIconModule
} from '@skyux/indicators';

import {
  SkyRepeaterModule,
  SkySortModule
} from '@skyux/lists';

import {
  SkyDropdownModule
} from '@skyux/popovers';

import {
  SkyAppLinkModule
} from '@skyux/router';

import {
  SkyGridModule
} from '@skyux/grids';

import {
  SkyCodeModule
} from '@blackbaud/skyux-lib-code-block';

import {
  SkyCheckboxModule
} from '@skyux/forms';

import {
  SkyActionButtonModule,
  SkyAuthHttpClientModule, // Supports docs pages with `svcid` param.
  SkyBackToTopModule,
  SkyCardModule,
  SkyDefinitionListModule,
  SkyFluidGridModule,
  SkyFormatModule,
  SkyInlineDeleteModule,
  SkyPageModule,
  SkyPageSummaryModule,
  SkyTextExpandModule,
  SkyTextExpandRepeaterModule,
  SkyToolbarModule
} from './public/public_api';

@NgModule({
  exports: [
    SkyActionButtonModule,
    SkyAlertModule,
    SkyAppLinkModule,
    SkyAvatarModule,
    SkyBackToTopModule,
    SkyCodeModule,
    SkyCardModule,
    SkyDefinitionListModule,
    SkyGridModule,
    SkyDocsToolsModule,
    SkyDropdownModule,
    SkyFluidGridModule,
    SkyCheckboxModule,
    SkyFormatModule,
    SkyIconModule,
    SkyKeyInfoModule,
    SkyLabelModule,
    SkyPageModule,
    SkyPageSummaryModule,
    SkyRepeaterModule,
    SkySortModule,
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

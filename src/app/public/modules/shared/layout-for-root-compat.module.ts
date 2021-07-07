import {
  NgModule
} from '@angular/core';

import {
  MutationObserverService,
  SkyAppWindowRef,
  SkyCoreAdapterService,
  SkyMediaQueryService
} from '@skyux/core';

/**
 * @internal
 * @deprecated This module can be removed after we upgrade SKY UX development dependencies to version 5.
 */
 @NgModule({
  providers: [
    MutationObserverService,
    SkyAppWindowRef,
    SkyCoreAdapterService,
    SkyMediaQueryService
  ]
})
export class SkyLayoutForRootCompatModule {}

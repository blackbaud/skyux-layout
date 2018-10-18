import {
  SkyAppLocaleInfo,
  SkyLibResourcesProvider
} from '@skyux/i18n';

export class SkyLayoutResourcesProvider implements SkyLibResourcesProvider {
  public getString: (localeInfo: SkyAppLocaleInfo, name: string) => string;
}

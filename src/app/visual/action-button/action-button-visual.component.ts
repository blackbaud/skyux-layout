import {
  Component
} from '@angular/core';

import {
  SkyThemeService,
  SkyThemeSettings
} from '@skyux/theme';

import {
  SkyActionButtonPermalink
} from '../../public/public_api';

@Component({
  selector: 'action-button-visual',
  templateUrl: './action-button-visual.component.html'
})
export class ActionButtonVisualComponent {

  public buttonIsClicked: boolean = false;

  public permalink = {
    url: 'https://developer.blackbaud.com/skyux/components'
  };

  public routerlink: SkyActionButtonPermalink = {
    route: {
      commands: [],
      extras: {
        queryParams: {
          component: 'MyComponent'
        }
      }
    }
  };

  constructor(
    private themeSvc: SkyThemeService
  ) { }

  public buttonClicked() {
    this.buttonIsClicked = true;
  }

  public themeSettingsChange(themeSettings: SkyThemeSettings): void {
    this.themeSvc.setTheme(themeSettings);
  }
}

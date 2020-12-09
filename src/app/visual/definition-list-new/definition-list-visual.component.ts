import {
  Component
} from '@angular/core';

import {
  SkyThemeService,
  SkyThemeSettings
} from '@skyux/theme';

@Component({
  selector: 'definition-list-new-visual',
  templateUrl: './definition-list-visual.component.html',
  styleUrls: [
    './definition-list-visual.component.scss'
  ]
})
export class DefinitionListNewVisualComponent {

  constructor(private themeSvc: SkyThemeService) { }

  public themeSettingsChange(themeSettings: SkyThemeSettings): void {
    this.themeSvc.setTheme(themeSettings);
  }

}

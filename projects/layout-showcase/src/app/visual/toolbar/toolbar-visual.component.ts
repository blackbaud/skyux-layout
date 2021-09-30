import {
  Component
} from '@angular/core';

import {
  SkyThemeService
} from '@skyux/theme';

@Component({
  selector: 'app-toolbar-visual',
  templateUrl: './toolbar-visual.component.html'
})
export class ToolbarVisualComponent {

  public theme: string;

  constructor (themeSvc: SkyThemeService) {
    themeSvc.settingsChange.subscribe(change => {
      this.theme = change.currentSettings.theme.name;
    })
  }

}

import {
  NgModule
} from '@angular/core';

import { SkyActionButtonModule } from '@skyux/layout';
import { SkyTheme, SkyThemeMode, SkyThemeService, SkyThemeSettings, SkyThemeSettingsChange } from '@skyux/theme';
import { BehaviorSubject } from 'rxjs';

@NgModule({
  exports: [
    SkyActionButtonModule
  ],
  providers: [
    {
      provide: SkyThemeService,
      useValue: {
        settingsChange: new BehaviorSubject<SkyThemeSettingsChange>(
          {
            currentSettings: new SkyThemeSettings(
              SkyTheme.presets.default,
              SkyThemeMode.presets.light
            ),
            previousSettings: undefined
          }
        )
      }
    }
  ]
})
export class SkyActionButtonTestingModule {}

import {
  Component
} from '@angular/core';

import {
  SkyThemeService,
  SkyThemeSettings
} from '@skyux/theme';

import {
  SkyFluidGridGutterSize
} from 'projects/layout/src/public-api';

@Component({
  selector: 'app-fluid-grid-visual',
  templateUrl: './fluid-grid-visual.component.html',
  styles: [`
    .sky-column {
      background-color: #97eced;
      border: 1px solid #56e0e1;
    }`]
})
export class FluidGridVisualComponent {

  public disableMargin: boolean = false;

  public gutterSize: SkyFluidGridGutterSize = SkyFluidGridGutterSize.Large;

  public gutterSizes: SkyFluidGridGutterSize[] = [
    SkyFluidGridGutterSize.Small,
    SkyFluidGridGutterSize.Medium,
    SkyFluidGridGutterSize.Large
  ];

  constructor(private themeSvc: SkyThemeService) { }

  public themeSettingsChange(themeSettings: SkyThemeSettings): void {
    this.themeSvc.setTheme(themeSettings);
  }

  public getEnumName(key: number): string {
    return SkyFluidGridGutterSize[key];
  }

}

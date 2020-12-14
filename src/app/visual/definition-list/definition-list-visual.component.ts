import {
  Component
} from '@angular/core';

import {
  SkyThemeService,
  SkyThemeSettings
} from '@skyux/theme';

@Component({
  selector: 'definition-list-visual',
  templateUrl: './definition-list-visual.component.html'
})
export class DefinitionListVisualComponent {

  public orgInfo: {label: string, value?: string}[] = [
    {
      label: 'Organization name',
      value: 'This name appears as the creator of the application on the App Marketplace card.'
    },
    {
      label: 'Organization name',
      value: 'This name appears as the creator of the application on the App Marketplace card.'
    },
    {
      label: 'Organization name',
      value: 'This name appears as the creator of the application on the App Marketplace card.'
    }
  ];

  public personalInfo: {label: string, value?: string}[] = [
    {
      label: 'Student ID',
      value: '0002971955'
    },
    {
      label: 'Advisor',
      value: 'L. Henegar'
    },
    {
      label: 'Experience'
    },
    {
      label: 'Grade level',
      value: '12'
    }
  ];

  public showHeader: boolean = true;

  constructor(private themeSvc: SkyThemeService) { }

  public onLongLabelClick(): void {
    this.personalInfo[1].value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam auctor leo at lectus fringilla lobortis. Donec ullamcorper sed dolor eget posuere. Phasellus aliquet, neque in cursus commodo, libero turpis rhoncus purus, vel gravida quam risus et arcu. Quisque auctor risus tristique ligula pretium commodo. Aenean viverra mi vel lectus rutrum pretium. Duis condimentum dolor justo, sit amet lobortis turpis pharetra et. Integer tempor faucibus risus quis semper. Praesent in lacinia justo. Sed posuere porta ex nec aliquet.';
  }

  public onToggleHeaderClick(): void {
    this.showHeader = !this.showHeader;
  }

  public themeSettingsChange(themeSettings: SkyThemeSettings): void {
    this.themeSvc.setTheme(themeSettings);
  }
}

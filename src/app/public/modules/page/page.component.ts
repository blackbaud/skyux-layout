import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  SkyPageThemeService
} from './page-theme.service';

@Component({
  selector: 'sky-page',
  templateUrl: './page.component.html',
  providers: [SkyPageThemeService]
})
export class SkyPageComponent implements OnInit, OnDestroy {

  constructor(private pageThemeSvc: SkyPageThemeService) { }

  public ngOnInit() {
    this.pageThemeSvc.addTheme();
  }

  public ngOnDestroy() {
    this.pageThemeSvc.removeTheme();
  }

}

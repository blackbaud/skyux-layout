import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  SkyThemeService
} from '@skyux/theme';

import {
  takeUntil
} from 'rxjs/operators';

import {
  Subject
} from 'rxjs';

/**
 * Wraps action buttons to ensures that they have consistent height and spacing.
 * @required
 */
@Component({
  selector: 'sky-action-button-container',
  styleUrls: ['./action-button-container.component.scss'],
  templateUrl: './action-button-container.component.html'
})
export class SkyActionButtonContainerComponent implements OnInit {

  public themeName: string;

  private ngUnsubscribe = new Subject();

  constructor(
    private themeSvc: SkyThemeService,
    private changeRef: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    if (this.themeSvc) {
      this.themeSvc.settingsChange
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe((themeSettings) => {
          this.themeName = themeSettings.currentSettings?.theme?.name;
          this.changeRef.markForCheck();
        });
    }
  }

}

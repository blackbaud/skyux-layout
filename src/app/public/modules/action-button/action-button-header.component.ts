import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
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
 * Specifies a header to display on an action button.
 */
@Component({
  selector: 'sky-action-button-header',
  styleUrls: ['./action-button-header.component.scss'],
  templateUrl: './action-button-header.component.html'
})
export class SkyActionButtonHeaderComponent implements OnDestroy, OnInit {

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

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}

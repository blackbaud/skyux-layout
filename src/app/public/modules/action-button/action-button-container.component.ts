import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  SkyCoreAdapterService
} from '@skyux/core';

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

  @ViewChild('container', {
    read: ElementRef,
    static: true
  })
  private elementRef: ElementRef<any>;

  private ngUnsubscribe = new Subject();

  constructor(
    private themeSvc: SkyThemeService,
    private changeRef: ChangeDetectorRef,
    private coreAdapterService: SkyCoreAdapterService
  ) { }

  public ngOnInit(): void {
    if (this.themeSvc) {
      this.themeSvc.settingsChange
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe((themeSettings) => {
          this.themeName = themeSettings.currentSettings?.theme?.name;
          if (themeSettings.currentSettings?.theme?.name === 'modern') {
            setTimeout(() => {
              this.coreAdapterService.resetHeight(this.elementRef, '.sky-action-button');
              this.coreAdapterService.syncHeight(this.elementRef, '.sky-action-button');
            });
          }
          this.changeRef.markForCheck();
        });
    }
  }

}

import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
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

import {
  SkyActionButtonAdapterService
} from './action-button-adapter-service';

import {
  SkyAcitonButtonContainerJustify
} from './types/action-button-container-justify';

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

  /**
   * Specifies how to display the action buttons inside the action button container.
   */
  @Input()
  public justify: SkyAcitonButtonContainerJustify = SkyAcitonButtonContainerJustify.center;

  public themeName: string;

  @ViewChild('container', {
    read: ElementRef,
    static: true
  })
  private containerRef: ElementRef<any>;

  private ngUnsubscribe = new Subject();

  constructor(
    private actionButtonAdapterService: SkyActionButtonAdapterService,
    private changeRef: ChangeDetectorRef,
    private coreAdapterService: SkyCoreAdapterService,
    private themeSvc: SkyThemeService
  ) { }

  public ngOnInit(): void {
    if (this.themeSvc) {
      this.themeSvc.settingsChange
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe((themeSettings) => {
          this.themeName = themeSettings.currentSettings?.theme?.name;
          if (this.themeName === 'modern') {
            setTimeout(() => {
              this.updateResponsiveClass();
              this.coreAdapterService.syncMaxHeight(this.containerRef, '.sky-action-button');
            });
          }
          this.changeRef.markForCheck();
        });
    }
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    if (this.themeName === 'modern') {
      this.updateResponsiveClass();
    }
  }

  private updateResponsiveClass(): void {
    const parentWidth = this.actionButtonAdapterService.getParentWidth(this.containerRef);
    this.actionButtonAdapterService.setResponsiveClass(this.containerRef, parentWidth);
  }

}

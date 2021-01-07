import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild
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

import {
  SkyDefinitionListService
} from './definition-list.service';

/**
 * Specifies the value in a label-value pair.
 */
@Component({
  selector: 'sky-definition-list-value',
  templateUrl: './definition-list-value.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDefinitionListValueComponent implements OnDestroy, OnInit {

  public defaultValue: string;

  public themeName: string;

  @ViewChild('valueTemplateRef', {
    read: TemplateRef,
    static: true
  })
  public templateRef: TemplateRef<any>;

  private ngUnsubscribe = new Subject();

  constructor(
    public service: SkyDefinitionListService,
    private changeRef: ChangeDetectorRef,
    private themeSvc: SkyThemeService
  ) {}

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

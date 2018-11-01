import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  OnDestroy,
  QueryList
} from '@angular/core';

import {
  Subscription
} from 'rxjs/Subscription';

import {
  SkyMediaBreakpoints,
  SkyMediaQueryService
} from '@skyux/core';

import {
  SkySummaryActionbarSecondaryActionComponent
} from './summary-actionbar-secondary-action.component';

@Component({
  selector: 'sky-summary-actionbar-secondary-actions',
  templateUrl: './summary-actionbar-secondary-actions.component.html',
  styleUrls: ['./summary-actionbar-secondary-actions.component.scss']
})
export class SkySummaryActionbarSecondaryActionsComponent implements AfterContentInit, OnDestroy {

  @ContentChildren(SkySummaryActionbarSecondaryActionComponent)
  public actions: QueryList<SkySummaryActionbarSecondaryActionComponent>;

  public isXsScreen: boolean;

  private mediaQuerySubscription: Subscription;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private mediaQueryService: SkyMediaQueryService
  ) { }

  public ngAfterContentInit() {
    this.mediaQuerySubscription = this.mediaQueryService.subscribe((args: SkyMediaBreakpoints) => {
      if (args === SkyMediaBreakpoints.xs) {
        this.isXsScreen = true;
      } else {
        this.isXsScreen = false;
      }
      this.checkAndUpdateChildrenType();
    });

    this.actions.changes.subscribe(() => {
      this.checkAndUpdateChildrenType();
    });
    if (this.mediaQueryService.current === SkyMediaBreakpoints.xs) {
      this.isXsScreen = true;
    }
    this.checkAndUpdateChildrenType();
  }

  public ngOnDestroy() {
    this.mediaQuerySubscription.unsubscribe();
  }

  private checkAndUpdateChildrenType() {
    /* istanbul ignore else */
    if (this.actions) {
      let isDropdown = false;
      if (this.actions.length >= 5 || this.isXsScreen) {
        isDropdown = true;
      }
      this.actions.forEach(action => {
        action.isDropdown = isDropdown;
      });
    }
    this.changeDetector.detectChanges();
  }

}

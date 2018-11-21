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
  private actionChanges: Subscription;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private mediaQueryService: SkyMediaQueryService
  ) { }

  public ngAfterContentInit(): void {
    this.mediaQuerySubscription = this.mediaQueryService.subscribe((args: SkyMediaBreakpoints) => {
      this.isXsScreen = args === SkyMediaBreakpoints.xs;
      this.checkAndUpdateChildrenType();
    });

    this.actionChanges = this.actions.changes.subscribe(() => {
      this.checkAndUpdateChildrenType();
    });
    if (this.mediaQueryService.current === SkyMediaBreakpoints.xs) {
      this.isXsScreen = true;
    }
    this.checkAndUpdateChildrenType();
  }

  public ngOnDestroy(): void {
    this.mediaQuerySubscription.unsubscribe();
    this.actionChanges.unsubscribe();
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

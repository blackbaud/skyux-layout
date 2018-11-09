import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  OnDestroy
} from '@angular/core';

import {
  Subscription
} from 'rxjs/Subscription';

import {
  skyAnimationSlideNoTrim
} from '@skyux/animations';

import {
  SkyMediaBreakpoints,
  SkyMediaQueryService
} from '@skyux/core';

import {
  SkySummaryActionbarSummaryComponent
} from './summary';

import {
  SkySummaryActionbarAdapterService
} from './summary-actionbar-adapter.service';

@Component({
  selector: 'sky-summary-actionbar',
  templateUrl: './summary-actionbar.component.html',
  styleUrls: ['./summary-actionbar.component.scss'],
  animations: [skyAnimationSlideNoTrim]
})
export class SkySummaryActionbarComponent implements AfterViewInit, OnDestroy {

  @ContentChild(SkySummaryActionbarSummaryComponent, { read: ElementRef })
  public summaryElement: ElementRef;

  public summaryCollapseMode: boolean;

  public isSummaryCollapsed: boolean;

  public slideDirection: string = 'down';

  public inModalFooter: boolean;

  private mediaQuerySubscription: Subscription;

  constructor(
    private adapterService: SkySummaryActionbarAdapterService,
    private changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef,
    private mediaQueryService: SkyMediaQueryService
    ) { }

  public ngAfterViewInit() {
    let modalType = this.adapterService.isInModalFooter(this.elementRef.nativeElement);
    this.inModalFooter = modalType !== '';
    if (!this.inModalFooter) {
      this.setupReactiveState();

      this.adapterService.adjustForActionbar();
    } else {
      this.adapterService.addModalFooterClass();

      if (modalType === 'full') {
        this.setupReactiveState();
      } else {
        this.summaryCollapseMode = true;
      }
    }
    this.changeDetector.detectChanges();
  }

  public ngOnDestroy() {
    if (!this.inModalFooter) {
      this.adapterService.adjustForActionbar(true);
      this.adapterService.removeResizeListener();
    }

    if (this.mediaQuerySubscription) {
      this.mediaQuerySubscription.unsubscribe();
    }
  }

  public summaryContentExists() {
    if (this.summaryElement && this.summaryElement.nativeElement.children.length > 0) {
      return true;
    }
    return false;
  }

  public showSummarySection() {
    this.slideDirection = 'down';
  }

  public hideSummarySection() {
    this.slideDirection = 'up';
  }

  // NOTE: This function is needed so that the button is not removed until post-animation
  public summaryTransitionEnd() {
    if (this.slideDirection === 'up') {
      this.isSummaryCollapsed = true;
    }
  }

  // NOTE: This function is needed so that the button is added before animation
  public summaryTransitionStart() {
    if (this.slideDirection === 'down') {
      this.isSummaryCollapsed = false;
    }
  }

  private setupReactiveState() {
    this.mediaQuerySubscription = this.mediaQueryService.subscribe((args: SkyMediaBreakpoints) => {
      if (args === SkyMediaBreakpoints.xs) {
        this.summaryCollapseMode = true;
      } else {
        this.summaryCollapseMode = false;
        this.isSummaryCollapsed = false;
        this.slideDirection = 'down';
      }
    });

    this.adapterService.setupResizeListener();

    if (this.mediaQueryService.current === SkyMediaBreakpoints.xs) {
      this.summaryCollapseMode = true;
    }
  }
}

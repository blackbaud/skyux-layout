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
  skyAnimationSlide
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
import { SkySummaryActionbarType } from './types';

/**
 * Auto-incrementing integer used to generate unique ids for summary actionbar components.
 */
let nextId = 0;

@Component({
  selector: 'sky-summary-actionbar',
  templateUrl: './summary-actionbar.component.html',
  styleUrls: ['./summary-actionbar.component.scss'],
  animations: [skyAnimationSlide]
})
export class SkySummaryActionbarComponent implements AfterViewInit, OnDestroy {

  @ContentChild(SkySummaryActionbarSummaryComponent, { read: ElementRef })
  public summaryElement: ElementRef;

  public summaryCollapseMode: boolean;

  public isSummaryCollapsed: boolean;

  public slideDirection: string = 'down';

  public inModalFooter: boolean;

  public summaryId: string = `sky-summary-actionbar-summary-${++nextId}`;

  private mediaQuerySubscription: Subscription;

  constructor(
    private adapterService: SkySummaryActionbarAdapterService,
    private changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef,
    private mediaQueryService: SkyMediaQueryService
    ) { }

  public ngAfterViewInit(): void {
    let summaryActionbarType = this.adapterService.getSummaryActionbarType(this.elementRef.nativeElement);
    this.inModalFooter = summaryActionbarType === SkySummaryActionbarType.StandardModal ||
      summaryActionbarType === SkySummaryActionbarType.FullPageModal;

    if (summaryActionbarType === SkySummaryActionbarType.Page) {
      this.setupReactiveState();

      this.adapterService.adjustForActionbar();
    } else {
      this.adapterService.addModalFooterClass();

      if (summaryActionbarType === SkySummaryActionbarType.FullPageModal) {
        this.setupReactiveState();
      } else if (summaryActionbarType === SkySummaryActionbarType.StandardModal) {
        this.summaryCollapseMode = true;
      }
    }
    this.changeDetector.detectChanges();
  }

  public ngOnDestroy(): void {
    if (!this.inModalFooter) {
      this.adapterService.adjustForActionbar(true);
      this.adapterService.removeResizeListener();
    }

    if (this.mediaQuerySubscription) {
      this.mediaQuerySubscription.unsubscribe();
    }
  }

  public summaryContentExists(): boolean {
    if (this.summaryElement && this.summaryElement.nativeElement.children.length > 0) {
      return true;
    }
    return false;
  }

  public showSummarySection(): void {
    this.slideDirection = 'down';
  }

  public hideSummarySection(): void {
    this.slideDirection = 'up';
  }

  // NOTE: This function is needed so that the button is not removed until post-animation
  public summaryTransitionEnd(): void {
    if (this.slideDirection === 'up') {
      this.isSummaryCollapsed = true;
    }
  }

  // NOTE: This function is needed so that the button is added before animation
  public summaryTransitionStart(): void {
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

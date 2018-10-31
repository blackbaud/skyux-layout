import {
  Component, ElementRef, ContentChild, AfterViewInit, OnDestroy, ChangeDetectorRef
} from '@angular/core';
import { SkySummaryActionbarSummaryComponent } from './summary';
import { SkySummaryActionbarAdapterService } from './summary-actionbar-adapter.service';
import { SkyMediaQueryService, SkyMediaBreakpoints } from '@skyux/core/modules/media-query';
import { Subscription } from 'rxjs/Subscription';
import {
  skyAnimationSlideNoPaddingOrMargin
} from '@skyux/animations/slide';

@Component({
  selector: 'sky-summary-actionbar',
  templateUrl: './summary-actionbar.component.html',
  styleUrls: ['./summary-actionbar.component.scss'],
  animations: [skyAnimationSlideNoPaddingOrMargin]
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
    private mediaQueryService: SkyMediaQueryService,
    private adapterService: SkySummaryActionbarAdapterService,
    private elementRef: ElementRef,
    private changeDetector: ChangeDetectorRef
  ) {}

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

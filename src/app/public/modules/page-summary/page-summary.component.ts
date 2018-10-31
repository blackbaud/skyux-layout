import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  OnDestroy,
  QueryList
} from '@angular/core';

import {
  Subject,
  Subscription
} from 'rxjs';

import {
  SkyMediaBreakpoints,
  SkyMediaQueryService,
  SkyWindowRefService
} from '@skyux/core';

import {
  SkyPageSummaryAdapterService
} from './page-summary-adapter.service';
import {
  SkyPageSummaryKeyInfoComponent
} from './page-summary-key-info';

@Component({
  selector: 'sky-page-summary',
  templateUrl: './page-summary.component.html',
  styleUrls: ['./page-summary.component.scss'],
  providers: [SkyPageSummaryAdapterService]
})
export class SkyPageSummaryComponent implements OnDestroy, AfterViewInit {
  @ContentChildren(SkyPageSummaryKeyInfoComponent)
  public keyInfoComponents: QueryList<SkyPageSummaryKeyInfoComponent>;
  public hasKeyInfo: boolean;
  private breakpointSubscription: Subscription;
  private ngUnsubscribe = new Subject();

  constructor(
    private elRef: ElementRef,
    private adapter: SkyPageSummaryAdapterService,
    private mediaQueryService: SkyMediaQueryService,
    private window: SkyWindowRefService
  ) { }

  public ngAfterViewInit() {
    this.breakpointSubscription = this.mediaQueryService.subscribe(
      (args: SkyMediaBreakpoints) => {
        this.adapter.updateKeyInfoLocation(this.elRef, args === SkyMediaBreakpoints.xs);
      }
    );

    // Wrapped in timeout to avoid ExpressionChangedAfterItHasBeenCheckedError
    this.window.getWindow().setTimeout(() => {
      this.setHasKeyInfo();
    });
    this.keyInfoComponents.changes
      .takeUntil(this.ngUnsubscribe)
      .subscribe((change: any) => {
        this.setHasKeyInfo();
    });
  }

  public ngOnDestroy() {
    /* istanbul ignore else */
    /* sanity check */
    if (this.breakpointSubscription) {
      this.breakpointSubscription.unsubscribe();
    }
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private setHasKeyInfo() {
    this.hasKeyInfo = this.keyInfoComponents.length > 0;
  }
}

import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  OnDestroy,
  QueryList,
  ChangeDetectorRef
} from '@angular/core';

import {
  Subject,
  Subscription
} from 'rxjs';

import {
  SkyMediaBreakpoints,
  SkyMediaQueryService
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
  public get hasKeyInfo(): boolean {
    return (this.keyInfoComponents.length > 0);
  }

  @ContentChildren(SkyPageSummaryKeyInfoComponent, { read: SkyPageSummaryKeyInfoComponent })
  private keyInfoComponents: QueryList<SkyPageSummaryKeyInfoComponent>;

  private breakpointSubscription: Subscription;
  private ngUnsubscribe = new Subject();

  constructor(
    private elRef: ElementRef,
    private adapter: SkyPageSummaryAdapterService,
    private mediaQueryService: SkyMediaQueryService,
    private changeDetector: ChangeDetectorRef
  ) { }

  public ngAfterViewInit() {
    this.breakpointSubscription = this.mediaQueryService.subscribe(
      (args: SkyMediaBreakpoints) => {
        this.adapter.updateKeyInfoLocation(this.elRef, args === SkyMediaBreakpoints.xs);
      }
    );

    // Alert the template when key info components have been updated.
    this.keyInfoComponents.changes
      .takeUntil(this.ngUnsubscribe)
      .subscribe(() => {
        this.changeDetector.detectChanges();
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
}

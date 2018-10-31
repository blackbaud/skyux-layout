import {
  DebugElement
} from '@angular/core';
import {
  BrowserModule,
  By
} from '@angular/platform-browser';
import {
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

import {
  SkyMediaQueryService, SkyMediaBreakpoints
} from '@skyux/core/modules/media-query';
import {
  MockSkyMediaQueryService
} from '@skyux/core/testing';
import {
  expect
} from '@skyux-sdk/testing';

import {
  SkySummaryActionbarSecondaryActionsComponent, SkySummaryActionbarAdapterService
} from '.';
import {
  SkySummaryActionbarTestComponent
} from './fixtures/summary-actionbar.component.fixture';
import { SkySummaryActionbarModule } from './summary-actionbar.module';
import { SkyKeyInfoModule } from '@skyux/indicators';
import { SkySummaryActionbarComponent } from './summary-actionbar.component';

describe('Summary Actionbar action components', () => {
  let fixture: ComponentFixture<SkySummaryActionbarTestComponent>;
  let cmp: SkySummaryActionbarTestComponent;
  // let el: HTMLElement;
  let debugElement: DebugElement;
  let mockMediaQueryService: MockSkyMediaQueryService;

  beforeEach(() => {

    mockMediaQueryService = new MockSkyMediaQueryService();
    TestBed.configureTestingModule({
      declarations: [
        SkySummaryActionbarTestComponent
      ],
      imports: [
        BrowserModule,
        SkySummaryActionbarModule,
        SkyKeyInfoModule
      ]
    });

    fixture = TestBed.overrideComponent(SkySummaryActionbarSecondaryActionsComponent, {
      add: {
        providers: [
          {
            provide: SkyMediaQueryService,
            useValue: mockMediaQueryService
          }
        ]
      }
    })
    .overrideComponent(SkySummaryActionbarComponent, {
      add: {
        providers: [
          {
            provide: SkyMediaQueryService,
            useValue: mockMediaQueryService
          }
        ]
      }
    })
    .createComponent(SkySummaryActionbarTestComponent);

    cmp = fixture.componentInstance as SkySummaryActionbarTestComponent;
    // el = fixture.nativeElement as HTMLElement;
    debugElement = fixture.debugElement;
  });

  it('should not set the inModalFooter flag if it is not in a modal footer', () => {
    fixture.detectChanges();
    expect(cmp.summaryActionbar.inModalFooter).toBeFalsy();
  });

  it('should set a margin on the body if the actionbar is not in a modal footer', () => {
    fixture.detectChanges();
    let actionbarHeight = debugElement.query(By.css('.sky-summary-actionbar')).nativeElement.offsetHeight;
    expect(document.body.style.marginBottom).toBe(actionbarHeight + 'px');
  });

  it('should set a new margin on the body if the window is resized', () => {
    let adapter: SkySummaryActionbarAdapterService = TestBed.get(SkySummaryActionbarAdapterService);
    spyOn(adapter, 'adjustForActionbar').and.stub();
    fixture.detectChanges();
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
    expect(adapter.adjustForActionbar).toHaveBeenCalledTimes(2);
  });

  it('should remove the margin on the body if the actionbar is destroyed', () => {
    fixture.detectChanges();
    fixture.destroy();
    expect(document.body.style.marginBottom).toBe('');
  });

  it('should recognize when the summary has content', () => {
    fixture.detectChanges();
    expect(cmp.summaryActionbar.summaryContentExists()).toBeTruthy();
  });

  it('should recognize when the summary no has content', () => {
    cmp.noSummaryContent = true;
    fixture.detectChanges();
    expect(cmp.summaryActionbar.summaryContentExists()).toBeFalsy();
  });

  it('should recognize when the summary tag does not exist', () => {
    cmp.noSummary = true;
    fixture.detectChanges();
    expect(cmp.summaryActionbar.summaryContentExists()).toBeFalsy();
  });

  it('should not add the modal class if the actionbar is not in a modal footer', () => {
    fixture.detectChanges();
    expect(debugElement.query(By.css('.sky-summary-actionbar-modal'))).toBeNull();
  });

  it('should set summaryCollapseMode to false when on a large screen', () => {
    fixture.detectChanges();
    expect(cmp.summaryActionbar.summaryCollapseMode).toBeFalsy();
  });

  it('should set summaryCollapseMode to true when on a xs screen', () => {
    fixture.detectChanges();
    mockMediaQueryService.fire(SkyMediaBreakpoints.xs);
    fixture.detectChanges();
    expect(cmp.summaryActionbar.summaryCollapseMode).toBeTruthy();
  });

  it('should set isSummaryCollapsed to false when moving from a xs screen to a large screen', () => {
    fixture.detectChanges();
    mockMediaQueryService.fire(SkyMediaBreakpoints.xs);
    fixture.detectChanges();
    cmp.summaryActionbar.isSummaryCollapsed = true;
    mockMediaQueryService.fire(SkyMediaBreakpoints.lg);
    fixture.detectChanges();
    expect(cmp.summaryActionbar.isSummaryCollapsed).toBeFalsy();
  });

});

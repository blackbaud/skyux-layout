import {
  ApplicationRef,
  DebugElement
} from '@angular/core';

import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
  tick,
  async
} from '@angular/core/testing';

import {
  By
} from '@angular/platform-browser';

import {
  SkyMediaBreakpoints,
  SkyMediaQueryService
} from '@skyux/core';

import {
  MockSkyMediaQueryService
} from '@skyux/core/testing';

import {
  SkyModalService
} from '@skyux/modals';

import {
  expect
} from '@skyux-sdk/testing';

import {
  SkySummaryActionbarTestComponent
} from './fixtures/summary-actionbar.component.fixture';

import {
  SkySummaryActionbarFixtureModule
} from './fixtures/summary-actionbar.module.fixture';

import {
  SkySummaryActionbarComponent
} from './summary-actionbar.component';

import {
  SkySummaryActionbarAdapterService,
  SkySummaryActionbarSecondaryActionsComponent
} from '.';

describe('Summary Actionbar action components', () => {
  let fixture: ComponentFixture<SkySummaryActionbarTestComponent>;
  let cmp: SkySummaryActionbarTestComponent;
  let debugElement: DebugElement;
  let mockMediaQueryService: MockSkyMediaQueryService;
  let modalService: SkyModalService;

  beforeEach(() => {

    mockMediaQueryService = new MockSkyMediaQueryService();
    TestBed.configureTestingModule({
      imports: [
        SkySummaryActionbarFixtureModule
      ]
    });

    TestBed.overrideComponent(SkySummaryActionbarSecondaryActionsComponent, {
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
      });
  });

  beforeEach(
    inject(
      [
        SkyModalService,
        ApplicationRef
      ],
      (
        _modalService: SkyModalService,
        _applicationRef: ApplicationRef
      ) => {
        modalService = _modalService;
        modalService.dispose();
      }
    )
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SkySummaryActionbarTestComponent);

    cmp = fixture.componentInstance as SkySummaryActionbarTestComponent;
    debugElement = fixture.debugElement;
  });

  it('should not set the inModalFooter flag if it is not in a modal footer', () => {
    fixture.detectChanges();
    expect(cmp.summaryActionbar.inModalFooter).toBeFalsy();
  });

  it('should set the inModalFooter flag if it is in a modal footer', () => {
    cmp.hideMainActionbar = true;
    fixture.detectChanges();
    debugElement.query(By.css('#modal-trigger')).nativeElement.click();
    fixture.detectChanges();
    expect(cmp.openedModal.summaryActionbar.inModalFooter).toBeTruthy();
  });

  it('should set the inModalFooter flag if it is in a full screen modal footer', () => {
    cmp.hideMainActionbar = true;
    fixture.detectChanges();
    debugElement.query(By.css('#full-modal-trigger')).nativeElement.click();
    fixture.detectChanges();
    expect(cmp.openedModal.summaryActionbar.inModalFooter).toBeTruthy();
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
    let resizeEvent: any = document.createEvent('CustomEvent');
    resizeEvent.initEvent('resize', true, true);
    window.dispatchEvent(resizeEvent);
    fixture.detectChanges();
    expect(adapter.adjustForActionbar).toHaveBeenCalledTimes(2);
  });

  it('should remove the margin on the body if the actionbar is destroyed', () => {
    fixture.detectChanges();
    fixture.destroy();
    expect(document.body.style.marginBottom).toBe('');
  });

  it('should set a margin on the body if the actionbar is not in a modal footer', () => {
    cmp.hideMainActionbar = true;
    fixture.detectChanges();
    debugElement.query(By.css('#modal-trigger')).nativeElement.click();
    fixture.detectChanges();
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
    expect(document.querySelector('.sky-summary-actionbar-modal')).toBeNull();
  });

  it('should add the modal class if the actionbar is in a modal footer', () => {
    cmp.hideMainActionbar = true;
    fixture.detectChanges();
    debugElement.query(By.css('#modal-trigger')).nativeElement.click();
    fixture.detectChanges();
    expect(document.querySelector('.sky-summary-actionbar-modal')).not.toBeNull();
  });

  it('should remove the modal footer padding if the actionbar is in a modal footer', () => {
    cmp.hideMainActionbar = true;
    fixture.detectChanges();
    debugElement.query(By.css('#modal-trigger')).nativeElement.click();
    fixture.detectChanges();
    expect((<HTMLElement>document.querySelector('.sky-modal-footer-container')).style.padding).toBe('0px');
  });

  it('should set summaryCollapseMode to false when on a large screen', () => {
    fixture.detectChanges();
    expect(cmp.summaryActionbar.summaryCollapseMode).toBeFalsy();
  });

  it('should set summaryCollapseMode to true when on a large screen but normal modal', () => {
    cmp.hideMainActionbar = true;
    fixture.detectChanges();
    debugElement.query(By.css('#modal-trigger')).nativeElement.click();
    fixture.detectChanges();
    expect(cmp.openedModal.summaryActionbar.summaryCollapseMode).toBeTruthy();
  });

  it('should set summaryCollapseMode to false when on a large screen and full screen modal', () => {
    cmp.hideMainActionbar = true;
    fixture.detectChanges();
    debugElement.query(By.css('#full-modal-trigger')).nativeElement.click();
    fixture.detectChanges();
    expect(cmp.openedModal.summaryActionbar.summaryCollapseMode).toBeFalsy();
  });

  it('should set summaryCollapseMode to true when on a xs screen', () => {
    fixture.detectChanges();
    mockMediaQueryService.fire(SkyMediaBreakpoints.xs);
    fixture.detectChanges();
    expect(cmp.summaryActionbar.summaryCollapseMode).toBeTruthy();
  });

  it('should set summaryCollapseMode to true when on a xs screen and normal modal', () => {
    cmp.hideMainActionbar = true;
    fixture.detectChanges();
    debugElement.query(By.css('#modal-trigger')).nativeElement.click();
    fixture.detectChanges();
    mockMediaQueryService.fire(SkyMediaBreakpoints.xs);
    fixture.detectChanges();
    expect(cmp.openedModal.summaryActionbar.summaryCollapseMode).toBeTruthy();
  });

  it('should set summaryCollapseMode to true when on a xs screen and full screen modal', () => {
    cmp.hideMainActionbar = true;
    fixture.detectChanges();
    debugElement.query(By.css('#full-modal-trigger')).nativeElement.click();
    fixture.detectChanges();
    mockMediaQueryService.fire(SkyMediaBreakpoints.xs);
    fixture.detectChanges();
    expect(cmp.openedModal.summaryActionbar.summaryCollapseMode).toBeTruthy();
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

  it('should set isSummaryCollapsed to false when moving from a xs screen to a large screen in a full screen modal', () => {
    cmp.hideMainActionbar = true;
    fixture.detectChanges();
    debugElement.query(By.css('#full-modal-trigger')).nativeElement.click();
    fixture.detectChanges();
    mockMediaQueryService.fire(SkyMediaBreakpoints.xs);
    fixture.detectChanges();
    cmp.openedModal.summaryActionbar.isSummaryCollapsed = true;
    mockMediaQueryService.fire(SkyMediaBreakpoints.lg);
    fixture.detectChanges();
    expect(cmp.openedModal.summaryActionbar.isSummaryCollapsed).toBeFalsy();
  });

  it('should update slide direction and isSummaryCollapsed when collapsing the summary', fakeAsync(() => {
    fixture.detectChanges();
    mockMediaQueryService.fire(SkyMediaBreakpoints.xs);
    fixture.detectChanges();
    expect(cmp.summaryActionbar.isSummaryCollapsed).toBeFalsy();
    expect(cmp.summaryActionbar.slideDirection).toBe('down');
    debugElement.query(By.css('.sky-summary-actionbar-details-collapse button'))
      .nativeElement.click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(cmp.summaryActionbar.isSummaryCollapsed).toBeTruthy();
    expect(cmp.summaryActionbar.slideDirection).toBe('up');
  }));

  it('should update slide direction and isSummaryCollapsed when expanding the summary', fakeAsync(() => {
    fixture.detectChanges();
    mockMediaQueryService.fire(SkyMediaBreakpoints.xs);
    fixture.detectChanges();
    debugElement.query(By.css('.sky-summary-actionbar-details-collapse button'))
      .nativeElement.click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(cmp.summaryActionbar.isSummaryCollapsed).toBeTruthy();
    expect(cmp.summaryActionbar.slideDirection).toBe('up');
    debugElement.query(By.css('.sky-summary-actionbar-details-expand button'))
      .nativeElement.click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(cmp.summaryActionbar.isSummaryCollapsed).toBeFalsy();
    expect(cmp.summaryActionbar.slideDirection).toBe('down');
  }));

  describe('a11y', () => {
    it('should be accessible (standard lg setup)', async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(fixture.nativeElement).toBeAccessible();
      });
    }));

    it('should be accessible (standard xs setup)', async(() => {
      fixture.detectChanges();
      mockMediaQueryService.fire(SkyMediaBreakpoints.xs);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(fixture.nativeElement).toBeAccessible();
      });
    }));

    it('should be accessible (standard xs setup collapsed summary)', async(() => {
      fixture.detectChanges();
      mockMediaQueryService.fire(SkyMediaBreakpoints.xs);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        debugElement.query(By.css('.sky-summary-actionbar-details-collapse button'))
          .nativeElement.click();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(fixture.nativeElement).toBeAccessible();
        });
      });
    }));

    it('should be accessible (modal setup)', (done) => {
      fixture.detectChanges();
      cmp.hideMainActionbar = true;
      fixture.detectChanges();
      debugElement.query(By.css('#modal-trigger')).nativeElement.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        // Testing modal host here due to the modal not being contained in the fixture
        const modalHostElem = document.querySelector('sky-modal-host');
        expect(modalHostElem).toBeAccessible();
        (<HTMLElement> document.querySelector('.sky-modal-btn-close')).click();
        fixture.detectChanges();
        done();
      });
    });

    it('should be accessible (modal setup collapsed summary)', (done) => {
      fixture.detectChanges();
      cmp.hideMainActionbar = true;
      fixture.detectChanges();
      debugElement.query(By.css('#modal-trigger')).nativeElement.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        // Using query selector here due to the modal not being inside the debugElement
        (<HTMLElement>document.querySelector('.sky-summary-actionbar-details-collapse button'))
          .click();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          // Testing modal host here due to the modal not being contained in the fixture
          const modalHostElem = document.querySelector('sky-modal-host');
          expect(modalHostElem).toBeAccessible();
          (<HTMLElement> document.querySelector('.sky-modal-btn-close')).click();
          fixture.detectChanges();
          done();
        });
      });
    });

    it('should be accessible (full screen modal lg setup)', (done) => {
      fixture.detectChanges();
      cmp.hideMainActionbar = true;
      fixture.detectChanges();
      debugElement.query(By.css('#full-modal-trigger')).nativeElement.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
          // Testing modal host here due to the modal not being contained in the fixture
          const modalHostElem = document.querySelector('sky-modal-host');
          expect(modalHostElem).toBeAccessible();
          (<HTMLElement> document.querySelector('.sky-modal-btn-close')).click();
          fixture.detectChanges();
          done();
      });
    });

    it('should be accessible (full screen modal xs setup)', (done) => {
      fixture.detectChanges();
      cmp.hideMainActionbar = true;
      fixture.detectChanges();
      debugElement.query(By.css('#full-modal-trigger')).nativeElement.click();
      fixture.detectChanges();
      mockMediaQueryService.fire(SkyMediaBreakpoints.xs);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        // Testing modal host here due to the modal not being contained in the fixture
        const modalHostElem = document.querySelector('sky-modal-host');
        expect(modalHostElem).toBeAccessible();
        (<HTMLElement> document.querySelector('.sky-modal-btn-close')).click();
        fixture.detectChanges();
        done();
      });
    });

    it('should be accessible (full screen modal xs setup collapsed summary)', (done) => {
      fixture.detectChanges();
      cmp.hideMainActionbar = true;
      fixture.detectChanges();
      debugElement.query(By.css('#full-modal-trigger')).nativeElement.click();
      fixture.detectChanges();
      mockMediaQueryService.fire(SkyMediaBreakpoints.xs);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        // Using query selector here due to the modal not being inside the debugElement
        (<HTMLElement>document.querySelector('.sky-summary-actionbar-details-collapse button'))
          .click();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          // Testing modal host here due to the modal not being contained in the fixture
          const modalHostElem = document.querySelector('sky-modal-host');
          expect(modalHostElem).toBeAccessible();
          (<HTMLElement> document.querySelector('.sky-modal-btn-close')).click();
          fixture.detectChanges();
          done();
        });
      });
    });
  });

});

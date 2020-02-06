import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';

import {
  expect,
  SkyAppTestUtility
} from '@skyux-sdk/testing';

import {
  MutationObserverService
} from '@skyux/core';

import {
  DockFixtureComponent
} from './fixtures/dock.component.fixture';

import {
  DockFixturesModule
} from './fixtures/dock.module.fixture';

const STYLE_ELEMENT_SELECTOR = '[data-test-selector="sky-layout-dock-bottom-styles"]';

describe('Dock component', function () {

  let fixture: ComponentFixture<DockFixtureComponent>;
  let mutationCallbacks: Function[];

  /**
   * Takes an array of sorted stack orders and checks them against the dock's items.
   */
  function verifyStackOrder(order: number[]): void {
    const items = fixture.nativeElement.querySelectorAll(STYLE_ELEMENT_SELECTOR);
    for (let i = 0, len = items.length; i < len; i++) {
      const stackOrder = +items.item(i).getAttribute(STYLE_ELEMENT_SELECTOR);
      expect(stackOrder).toEqual(order[i]);
    }
  }

  /**
   * Mocks the mutation observer callback on DOM change.
   * Angular does not patch `MutationObserver` as a `Task` (like `setTimeout`) so observer callbacks
   * never get triggered in a `fakeAsync` zone.
   * See: https://github.com/angular/angular/issues/31695#issuecomment-425589295
   */
  function triggerMutationChange(): void {
    mutationCallbacks[0]();
    fixture.detectChanges();
    tick();
  }

  function triggerWindowResize(): void {
    SkyAppTestUtility.fireDomEvent(window, 'resize');
    fixture.detectChanges();
    tick(250); // Respect the RxJS debounceTime.
    fixture.detectChanges();
    tick();
  }

  function getStyleElement(): HTMLStyleElement {
    return document.getElementsByTagName('head')[0].querySelector(STYLE_ELEMENT_SELECTOR);
  }

  function getDockHeight(): number {
    return document.querySelector('sky-dock').getBoundingClientRect().height;
  }

  beforeEach(function () {
    TestBed.configureTestingModule({
      imports: [
        DockFixturesModule
      ],
      providers: [{
        provide: MutationObserverService,
        useValue: {
          create: function (callback: Function): any {
            mutationCallbacks.push(callback);
            return {
              observe() {},
              disconnect() {}
            };
          }
        }
      }]
    });

    mutationCallbacks = [];
    fixture = TestBed.createComponent(DockFixtureComponent);
  });

  afterEach(function () {
    // Verify the dock element is removed.
    expect(document.querySelectorAll('sky-dock').length).toEqual(1);
    fixture.componentInstance.removeAllItems();
    expect(document.querySelectorAll('sky-dock').length).toEqual(0);

    // Verify the style elements are removed.
    const headElement = document.getElementsByTagName('head')[0];
    const styleElements = headElement.querySelectorAll(STYLE_ELEMENT_SELECTOR);
    expect(styleElements.length).toEqual(0);

    fixture.destroy();
  });

  it('should add elements to the dock in the proper stack order', function () {
    const dockItems = [
      {
        dockingOptions: {
          stackOrder: 0
        }
      },
      {
        dockingOptions: {
          stackOrder: 100
        }
      },
      {
        dockingOptions: {
          stackOrder: -10
        }
      },
      {
        dockingOptions: {
          stackOrder: 3
        }
      }
    ];

    fixture.componentInstance.dockItems = dockItems;
    fixture.detectChanges();

    verifyStackOrder([100, 3, 0, -10]);
  });

  it('should default to placing new items at the top of the stack', function () {
    const dockItems = [
      {
        dockingOptions: {
          stackOrder: 0
        }
      },
      {
        dockingOptions: {
          stackOrder: 10
        }
      },
      {} // Empty options should generate a stack order of +1
    ];

    fixture.componentInstance.dockItems = dockItems;
    fixture.detectChanges();

    verifyStackOrder([11, 10, 0]);

    // Single item's stack order should default to zero.
    fixture.componentInstance.dockItems = [{}];
    fixture.detectChanges();

    verifyStackOrder([0]);
  });

  it('should apply margin to the `body` to accommodate item height', fakeAsync(function () {
    const dockItems = [
      {
        height: 10
      },
      {
        height: 20
      },
      {
        height: 30
      }
    ];

    fixture.componentInstance.dockItems = dockItems;
    fixture.detectChanges();
    tick();

    triggerMutationChange();

    const styleElement = getStyleElement();
    const expectedHeight = getDockHeight();

    expect(styleElement.textContent).toContain(`body { margin-bottom: ${expectedHeight}px; }`);
  }));

  it('should adjust `body` margin if window resized', fakeAsync(() => {
    const dockItems = [
      {
        height: 10
      },
      {
        height: 20
      },
      {
        height: 30
      }
    ];

    fixture.componentInstance.dockItems = dockItems;
    fixture.detectChanges();
    tick();

    triggerWindowResize();

    const styleElement = getStyleElement();
    const expectedHeight = getDockHeight();

    expect(styleElement.textContent).toContain(`body { margin-bottom: ${expectedHeight}px; }`);
  }));

  it('should not adjust `body` margin if dock height unchanged', fakeAsync(() => {
    const dockItems = [
      {
        height: 10
      }
    ];

    fixture.componentInstance.dockItems = dockItems;
    fixture.detectChanges();
    tick();

    triggerMutationChange();

    const originalStyleElement = getStyleElement();

    triggerWindowResize();

    const newStyleElement = getStyleElement();

    // If the style element is unaffected, the margin styles were left unchanged.
    expect(newStyleElement).toEqual(originalStyleElement);
  }));

  it('should remove old style elements', fakeAsync(function () {
    let dockItems = [
      {
        height: 10
      }
    ];

    fixture.componentInstance.dockItems = dockItems;
    fixture.detectChanges();
    tick();

    triggerMutationChange();

    const originalStyleElement = getStyleElement();

    // Update the dock items to affect the dock's height.
    dockItems = [
      {
        height: 10
      },
      {
        height: 20
      }
    ];

    fixture.componentInstance.dockItems = dockItems;
    fixture.detectChanges();
    tick();

    triggerMutationChange();

    const newStyleElement = getStyleElement();

    expect(originalStyleElement).not.toEqual(newStyleElement);
  }));

});

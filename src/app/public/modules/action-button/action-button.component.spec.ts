import {
  DebugElement
} from '@angular/core';

import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
  async
} from '@angular/core/testing';

import {
  BrowserModule,
  By
} from '@angular/platform-browser';

import {
  RouterTestingModule
} from '@angular/router/testing';

import {
  expect,
  expectAsync
} from '@skyux-sdk/testing';

import {
  SkyCoreAdapterService,
  SkyMediaBreakpoints,
  SkyMediaQueryService
} from '@skyux/core';

import {
  MockSkyMediaQueryService
} from '@skyux/core/testing';

import {
  SkyTheme,
  SkyThemeMode,
  SkyThemeService,
  SkyThemeSettings,
  SkyThemeSettingsChange
} from '@skyux/theme';

import {
  BehaviorSubject
} from 'rxjs';

import {
  ActionButtonTestComponent
} from './fixtures/action-button.component.fixture';

import {
  SkyActionButtonComponent
} from './action-button.component';

import {
  SkyActionButtonModule
} from './action-button.module';

import {
  SkyActionButtonContainerAlignItems
} from './types/action-button-container-align-items';

import {
  SkyActionButtonContainerComponent
 } from './action-button-container.component';

//#region helpers
function getContainer(fixture: ComponentFixture<any>): HTMLElement {
  return fixture.nativeElement.querySelector('.sky-action-button-container');
}

function getActionButtons(fixture: ComponentFixture<any>): NodeListOf<HTMLElement> {
  return fixture.nativeElement.querySelectorAll('.sky-action-button-container .sky-action-button');
}
//#endregion

describe('Action button component', () => {
  let fixture: ComponentFixture<ActionButtonTestComponent>;
  let cmp: ActionButtonTestComponent;
  let el: HTMLElement;
  let debugElement: DebugElement;
  let mockMediaQueryService: MockSkyMediaQueryService;
  let mockThemeSvc: {
    settingsChange: BehaviorSubject<SkyThemeSettingsChange>
  };

  beforeEach(() => {
    mockThemeSvc = {
      settingsChange: new BehaviorSubject<SkyThemeSettingsChange>(
        {
          currentSettings: new SkyThemeSettings(
            SkyTheme.presets.default,
            SkyThemeMode.presets.light
          ),
          previousSettings: undefined
        }
      )
    };

    mockMediaQueryService = new MockSkyMediaQueryService();
    TestBed.configureTestingModule({
      declarations: [
        ActionButtonTestComponent
      ],
      imports: [
        BrowserModule,
        RouterTestingModule,
        SkyActionButtonModule
      ],
      providers: [
        SkyCoreAdapterService,
        {
          provide: SkyThemeService,
          useValue: mockThemeSvc
        }
      ]
    });

    fixture = TestBed.overrideComponent(SkyActionButtonComponent, {
      add: {
        providers: [
          {
            provide: SkyMediaQueryService,
            useValue: mockMediaQueryService
          }
        ]
      }
    })
    .createComponent(ActionButtonTestComponent);

    fixture = TestBed.createComponent(ActionButtonTestComponent);
    cmp = fixture.componentInstance as ActionButtonTestComponent;
    el = fixture.nativeElement as HTMLElement;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should see if there is a permalink url included as an input to the element', fakeAsync(() => {
    tick();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    let actionButton = el.querySelectorAll('.sky-action-button').item(1);
    expect(actionButton.tagName === 'a');
    expect(actionButton.getAttribute('href')).toBe('https://developer.blackbaud.com/skyux/components');
  }));

  it('should see if there is a permalink route included as an input to the element', () => {
    let actionButton = el.querySelectorAll('.sky-action-button').item(2);
    expect(actionButton.tagName === 'a');
    expect(actionButton.getAttribute('href')).toBe('/?page=1#fragment');
  });

  it('should use a div element when permalink is not provided', () => {
    let actionButton = '.sky-action-button';
    expect(el.querySelectorAll(actionButton).item(0).tagName === 'div');
  });

  it('should transclude icon, header, and detail sections', () => {
    let iconContainer
      = '.sky-action-button-icon-header-container .sky-action-button-icon-container';
    let headerContainer = '.sky-action-button-icon-header-container .sky-action-button-header';
    let detailsContainer = '.sky-action-button sky-action-button-details';

    expect(el.querySelector(iconContainer)).not.toBeNull();

    expect(el.querySelector(headerContainer)).not.toBeNull();

    expect(el.querySelector(detailsContainer)).not.toBeNull();
  });

  it('should emit a click event on button click', () => {
    debugElement.query(By.css('.sky-action-button')).triggerEventHandler('click', undefined);
    fixture.detectChanges();
    expect(cmp.buttonIsClicked).toBe(true);
  });

  it('should emit a click event on enter press', () => {
    debugElement.query(By.css('.sky-action-button'))
      .triggerEventHandler('keydown.escape', { });
    fixture.detectChanges();
    expect(cmp.buttonIsClicked).toBe(false);

    debugElement.query(By.css('.sky-action-button'))
      .triggerEventHandler('keydown.enter', { });
    fixture.detectChanges();
    expect(cmp.buttonIsClicked).toBe(true);
  });

  it('should have a role of button and tabindex on the clickable area', () => {
    expect(debugElement.query(By.css('.sky-action-button')).attributes['role']).toBe('button');
    expect(debugElement.query(By.css('.sky-action-button')).attributes['tabindex']).toBe('0');
  });

  it('should display an icon based on iconType', () => {
    let iconSelector =
      '.sky-action-button-icon-header-container .sky-action-button-icon-container i.fa-filter';
    expect(debugElement.query(By.css(iconSelector))).not.toBeNull();
  });

  it('should change icon size based on media breakpoints query', () => {
    let smallIconSelector =
      '.sky-action-button-icon-header-container .sky-action-button-icon-container i.fa-2x';
    let largeIconSelector =
      '.sky-action-button-icon-header-container .sky-action-button-icon-container i.fa-3x';
    mockMediaQueryService.fire(SkyMediaBreakpoints.xs);
    fixture.detectChanges();
    expect(debugElement.query(By.css(smallIconSelector))).not.toBeNull();
    mockMediaQueryService.fire(SkyMediaBreakpoints.sm);
    fixture.detectChanges();
    expect(debugElement.query(By.css(largeIconSelector))).not.toBeNull();
  });

  it('should be accessible', async () => {
    fixture.detectChanges();
    await fixture.whenStable().then(async () => {
      await expectAsync(fixture.nativeElement).toBeAccessible();
    });
  });

});

describe('Action button component modern theme', () => {
  let fixture: ComponentFixture<ActionButtonTestComponent>;
  let mockMediaQueryService: MockSkyMediaQueryService;
  let mockThemeSvc: {
    settingsChange: BehaviorSubject<SkyThemeSettingsChange>
  };

  beforeEach(() => {
    mockThemeSvc = {
      settingsChange: new BehaviorSubject<SkyThemeSettingsChange>(
        {
          currentSettings: new SkyThemeSettings(
            SkyTheme.presets.modern,
            SkyThemeMode.presets.light
          ),
          previousSettings: undefined
        }
      )
    };

    mockMediaQueryService = new MockSkyMediaQueryService();
    TestBed.configureTestingModule({
      declarations: [
        ActionButtonTestComponent
      ],
      imports: [
        BrowserModule,
        RouterTestingModule,
        SkyActionButtonModule
      ],
      providers: [
        SkyCoreAdapterService,
        {
          provide: SkyThemeService,
          useValue: mockThemeSvc
        }
      ]
    });

    fixture = TestBed.overrideComponent(SkyActionButtonComponent, {
      add: {
        providers: [
          {
            provide: SkyMediaQueryService,
            useValue: mockMediaQueryService
          }
        ]
      }
    })
    .createComponent(ActionButtonTestComponent);

    fixture = TestBed.createComponent(ActionButtonTestComponent);
    fixture.detectChanges();
  });

  it('should have center justified class by default', () => {
    fixture.detectChanges();
    const container = getContainer(fixture);
    expect(container).toHaveCssClass('sky-action-button-container-align-center');
    expect(container).not.toHaveCssClass('sky-action-button-container-align-left');
  });

  it(`should set class when alignItems property is 'left'`, () => {
    fixture.componentInstance.alignItems = SkyActionButtonContainerAlignment.left;
    fixture.detectChanges();
    const container = getContainer(fixture);
    expect(container).toHaveCssClass('sky-action-button-container-align-left');
    expect(container).not.toHaveCssClass('sky-action-button-container-align-center');
  });

  it(`should set class when alignItems property is 'right'`, () => {
    fixture.componentInstance.alignItems = SkyActionButtonContainerAlignment.center;
    fixture.detectChanges();
    const container = getContainer(fixture);
    expect(container).toHaveCssClass('sky-action-button-container-align-center');
    expect(container).not.toHaveCssClass('sky-action-button-container-align-left');
  });

  it(`should sync all child action buttons to have the same height as the tallest action button`, async(() => {
    fixture.componentInstance.firstButtonHeight = '500px';
    fixture.detectChanges();
    // Wait for setTimeout() to fire.
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const buttons = getActionButtons(fixture);
      for (let i = 0; i < buttons.length; i++) {
        expect(buttons[i].style.height).toEqual('500px');
      }
    });
  }));

  it(`should update CSS responsive classes on window resize`, async(() => {
    const spy = spyOn(SkyActionButtonContainerComponent.prototype as any, 'updateResponsiveClass');
    expect(spy).not.toHaveBeenCalled();

    // IE 11 workaround for window.dispatchEvent.
    if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
      const evt = document.createEvent('UIEvents') as any;
      evt.initUIEvent('resize', true, false, window, 0);
      window.dispatchEvent(evt);
    } else {
      window.dispatchEvent(new Event('resize'));
    }
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledTimes(1);
  }));
});

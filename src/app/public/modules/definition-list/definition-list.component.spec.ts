import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';

import {
  expect,
  expectAsync,
  SkyAppTestUtility
} from '@skyux-sdk/testing';

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
  SkyDefinitionListTestComponent
} from './fixtures/definition-list.component.fixture';

import {
  SkyDefinitionListFixturesModule
} from './fixtures/definition-list-fixtures.module';

import {
  SkyDefinitionListAdapterService
} from './definition-list-adapter-service';

describe('Definition list component', () => {
  let fixture: ComponentFixture<SkyDefinitionListTestComponent>;
  let mockThemeSvc: {
    settingsChange: BehaviorSubject<SkyThemeSettingsChange>
  };

  beforeEach(fakeAsync(() => {
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

    TestBed.configureTestingModule({
      imports: [
        SkyDefinitionListFixturesModule
      ],
      providers: [
        {
          provide: SkyThemeService,
          useValue: mockThemeSvc
        }
      ]
    });

    fixture = TestBed.createComponent(SkyDefinitionListTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  function getListEl(el: Element, listIndex: number): Element {
    return el.querySelector('.sky-definition-list-test-' + listIndex);
  }

  function getDlEls(el: Element): NodeListOf<Element> {
    return el.querySelectorAll('dl');
  }

  function getLabelEls(listEl: Element): NodeListOf<Element> {
    return listEl.querySelectorAll('dt');
  }

  function getValueEls(listEl: Element): NodeListOf<Element> {
    return listEl.querySelectorAll('dd');
  }

  it('should render the heading in the expected location', () => {
    let list1El = getListEl(fixture.nativeElement, 1);
    let headingEl =
      list1El.querySelector('sky-definition-list-heading .sky-definition-list-heading');

    expect(headingEl).toHaveText('Personal information');
    expect(headingEl).toHaveCssClass('sky-subsection-heading');
  });

  it('should render values in the expected locations', () => {
    let list1El = getListEl(fixture.nativeElement, 1);
    let labelEls = getLabelEls(list1El);
    let valueEls = getValueEls(list1El);

    expect(labelEls[0]).toHaveText('Job title');
    expect(valueEls[0]).toHaveText('Engineer');
  });

  it('should display a default value when no value is specified', () => {
    let list1El = getListEl(fixture.nativeElement, 1);
    let valueEls = getValueEls(list1El);

    expect(valueEls[2]).toHaveText('None found');
  });

  it('should update DOM when consumer array is changed', () => {
    let list1El = getListEl(fixture.nativeElement, 1);
    let labelEls = getLabelEls(list1El);
    let valueEls = getValueEls(list1El);

    expect(labelEls.length).toEqual(3);
    expect(valueEls.length).toEqual(3);

    fixture.componentInstance.personalInfo = [
      {
        label: 'foo',
        value: 'bar'
      }
    ];
    fixture.detectChanges();
    list1El = getListEl(fixture.nativeElement, 1);
    labelEls = getLabelEls(list1El);
    valueEls = getValueEls(list1El);

    expect(labelEls.length).toEqual(1);
    expect(valueEls.length).toEqual(1);
    expect(labelEls[0]).toHaveText('foo');
    expect(valueEls[0]).toHaveText('bar');
  });

  it('should allow the default value to be specified', () => {
    let list1El = getListEl(fixture.nativeElement, 2);
    let valueEls = getValueEls(list1El);

    expect(valueEls[2]).toHaveText('No information found');
  });

  it('should allow the label width to be specified', fakeAsync(() => {
    let list1El = getListEl(fixture.nativeElement, 2);
    let labelEls = getLabelEls(list1El);

    expect(getComputedStyle(labelEls[0]).width).toBe('150px');
  }));

  it('should not have the isMobile class when parent is greater than 480px wide', fakeAsync(() => {
    const adapterService = TestBed.inject(SkyDefinitionListAdapterService);
    spyOn(adapterService, 'getWidth').and.returnValue(481);
    SkyAppTestUtility.fireDomEvent(window, 'resize');
    fixture.detectChanges();
    const dl = getDlEls(fixture.nativeElement)[0];

    expect(dl).not.toHaveCssClass('sky-definition-list-mobile');
  }));

  it('should have the isMobile class when parent is less than 480px wide', fakeAsync(() => {
    const adapterService = TestBed.inject(SkyDefinitionListAdapterService);
    spyOn(adapterService, 'getWidth').and.returnValue(479);
    SkyAppTestUtility.fireDomEvent(window, 'resize');
    fixture.detectChanges();
    const dl = getDlEls(fixture.nativeElement)[0];

    expect(dl).toHaveCssClass('sky-definition-list-mobile');
  }));

  it('should use proper classes in modern theme', () => {
    const list1El = getListEl(fixture.nativeElement, 1);
    const spans = list1El.querySelectorAll('[data-sky-id*="sky-definition-list-default-value"]');

    for (let i = 0; i < spans.length; i++) {
      expect(spans[i]).toHaveCssClass('sky-deemphasized');
    }

    mockThemeSvc.settingsChange.next({
      currentSettings: new SkyThemeSettings(
        SkyTheme.presets.modern,
        SkyThemeMode.presets.light
      ),
      previousSettings: mockThemeSvc.settingsChange.getValue().currentSettings
    });
    fixture.detectChanges();

    for (let i = 0; i < spans.length; i++) {
      expect(spans[i]).toHaveCssClass('sky-font-deemphasized');
    }
  });

  it('should be accessible', async () => {
    let asyncFixture = TestBed.createComponent(SkyDefinitionListTestComponent);
    asyncFixture.detectChanges();
    await asyncFixture.whenStable().then(async () => {
      await expectAsync(asyncFixture.nativeElement).toBeAccessible();
    });
  });

});

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
  SkyDescriptionListTestComponent
} from './fixtures/description-list.component.fixture';

import {
  SkyDescriptionListFixturesModule
} from './fixtures/description-list-fixtures.module';

import {
  SkyDescriptionListMode
} from './types/description-list-mode';

import {
  SkyDescriptionListAdapterService
} from './description-list-adapter-service';

describe('Description list component', () => {
  let fixture: ComponentFixture<SkyDescriptionListTestComponent>;
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
        SkyDescriptionListFixturesModule
      ],
      providers: [
        {
          provide: SkyThemeService,
          useValue: mockThemeSvc
        }
      ]
    });

    fixture = TestBed.createComponent(SkyDescriptionListTestComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  //#region helpers
  function getListEl(el: Element, listIndex: number): Element {
    return el.querySelector('.sky-description-list-test-' + listIndex);
  }

  function getDlEls(el: Element): NodeListOf<Element> {
    return el.querySelectorAll('dl');
  }

  function getTermEls(listEl: Element): NodeListOf<Element> {
    return listEl.querySelectorAll('dt');
  }

  function getDescriptionEls(listEl: Element): NodeListOf<Element> {
    return listEl.querySelectorAll('dd');
  }
  //#endregion

  it('should render list in default mode if no mode is supplied', () => {
    const dlEls = getDlEls(fixture.nativeElement);

    expect(dlEls[0]).toHaveCssClass('sky-description-list-default-mode');
    expect(dlEls[0]).not.toHaveCssClass('sky-description-list-long-description-mode');
  });

  it('should not have horizontal orientation class by default when in default mode', () => {
    const dlEls = getDlEls(fixture.nativeElement);

    expect(dlEls[0]).not.toHaveCssClass('sky-description-list-horizontal');
  });

  it('should have horizontal orientation class when in horizontal orientation', () => {
    fixture.componentInstance.orientation = 'horizontal';
    fixture.detectChanges();
    const dlEls = getDlEls(fixture.nativeElement);

    expect(dlEls[0]).toHaveCssClass('sky-description-list-horizontal');
  });

  it('should set list item width when in default mode', () => {
    const dlEls = getDlEls(fixture.nativeElement);
    const listItemContent = dlEls[0].querySelector('.sky-description-list-content');
    expect(listItemContent.clientWidth).not.toEqual(300);

    fixture.componentInstance.listItemWidth = '300px';
    fixture.detectChanges();

    expect(listItemContent.clientWidth).toEqual(300);
  });

  it('should not set list item width when in longDescription mode', () => {
    fixture.componentInstance.mode = SkyDescriptionListMode.longDescription;
    fixture.detectChanges();

    const dlEls = getDlEls(fixture.nativeElement);
    const listItemContent = dlEls[0].querySelector('.sky-description-list-content');
    fixture.componentInstance.listItemWidth = '300px';
    fixture.detectChanges();

    expect(listItemContent.clientWidth).not.toEqual(300);
  });

  it('should render descriptions in the expected locations', () => {
    const list1El = getListEl(fixture.nativeElement, 1);
    const termEls = getTermEls(list1El);
    const descriptionEls = getDescriptionEls(list1El);

    expect(termEls[0]).toHaveText('Job title');
    expect(descriptionEls[0]).toHaveText('Engineer');
  });

  it('should display a default description when no description is specified', () => {
    const list1El = getListEl(fixture.nativeElement, 1);
    const descriptionEls = getDescriptionEls(list1El);

    expect(descriptionEls[2]).toHaveText('None found');
  });

  it('should update DOM when consumer array is changed', () => {
    let list1El = getListEl(fixture.nativeElement, 1);
    let termEls = getTermEls(list1El);
    let descriptionEls = getDescriptionEls(list1El);

    expect(termEls.length).toEqual(3);
    expect(descriptionEls.length).toEqual(3);

    fixture.componentInstance.personalInfo = [
      {
        term: 'foo',
        description: 'bar'
      }
    ];
    fixture.detectChanges();
    list1El = getListEl(fixture.nativeElement, 1);
    termEls = getTermEls(list1El);
    descriptionEls = getDescriptionEls(list1El);

    expect(termEls.length).toEqual(1);
    expect(descriptionEls.length).toEqual(1);
    expect(termEls[0]).toHaveText('foo');
    expect(descriptionEls[0]).toHaveText('bar');
  });

  it('should allow the default value to be specified', () => {
    const list1El = getListEl(fixture.nativeElement, 2);
    const descriptionEls = getDescriptionEls(list1El);

    expect(descriptionEls[2]).toHaveText('No information found');
  });

  it('should call the adapter service when window is resized', fakeAsync(() => {
    const adapterService = TestBed.inject(SkyDescriptionListAdapterService);
    const spy = spyOn(adapterService, 'setResponsiveClass');
    SkyAppTestUtility.fireDomEvent(window, 'resize');
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  }));

  it('should use proper classes in modern theme', () => {
    const list1El = getListEl(fixture.nativeElement, 1);
    const spans = list1El.querySelectorAll('[data-sky-id*="sky-description-list-default-value"]');

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
    const asyncFixture = TestBed.createComponent(SkyDescriptionListTestComponent);
    asyncFixture.detectChanges();
    await asyncFixture.whenStable().then(async () => {
      await expectAsync(asyncFixture.nativeElement).toBeAccessible();
    });
  });

});

import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';

import {
  expect
} from '@skyux-sdk/testing';

import {
  SkyDefinitionListTestComponent
} from './fixtures/definition-list.component.fixture';

import {
  SkyDefinitionListFixturesModule
} from './fixtures/definition-list-fixtures.module';

describe('Definition list component', () => {
  let fixture: ComponentFixture<SkyDefinitionListTestComponent>;
  let el: Element;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyDefinitionListFixturesModule
      ]
    });

    fixture = TestBed.createComponent(SkyDefinitionListTestComponent);
    el = fixture.nativeElement;

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  function getListEl(el: Element, listIndex: number): Element {
    return el.querySelector('.sky-definition-list-test-' + listIndex);
  }

  function getLabelEls(listEl: Element): NodeListOf<Element> {
    return listEl.querySelectorAll('dt');
  }

  function getValueEls(listEl: Element): NodeListOf<Element> {
    return listEl.querySelectorAll('dd');
  }

  function getDefaultValueEl(valueEl: Element): Element {
    return valueEl.querySelector('.sky-deemphasized');
  }

  it('should render the heading in the expected location', () => {
    let list1El = getListEl(el, 1);
    let headingEl =
      list1El.querySelector('sky-definition-list-heading .sky-definition-list-heading');

    expect(headingEl).toHaveText('Personal information');
    expect(headingEl).toHaveCssClass('sky-subsection-heading');
  });

  it('should render values in the expected locations', () => {
    let list1El = getListEl(el, 1);
    let labelEls = getLabelEls(list1El);
    let valueEls = getValueEls(list1El);

    expect(labelEls[0]).toHaveText('Job title');
    expect(valueEls[0]).toHaveText('Engineer');
  });

  it('should display a default value when no value is specified', () => {
    let list1El = getListEl(el, 1);
    let valueEls = getValueEls(list1El);
    let defaultValueEl = valueEls[2].querySelector('.sky-deemphasized');

    expect(defaultValueEl).toHaveText('None found');
  });

  it('should display a subsequent value when no value is initially specified', () => {
    let list1El = getListEl(el, 1);
    let valueEls = getValueEls(list1El);
    let defaultValueEl = getDefaultValueEl(valueEls[2]);

    expect(defaultValueEl).toHaveText('None found');

    fixture.componentInstance.personalInfo[2].value = 'test';
    fixture.detectChanges();
    defaultValueEl = getDefaultValueEl(valueEls[2]);

    expect(defaultValueEl).toBeNull();
    expect(valueEls[2]).toHaveText('test');
  });

  it('should allow the default value to be specified', () => {
    let list1El = getListEl(el, 2);
    let valueEls = getValueEls(list1El);

    expect(valueEls[2]).toHaveText('No information found');
  });

  it('should allow the label width to be specified', fakeAsync(() => {
    let list1El = getListEl(el, 2);
    let labelEls = getLabelEls(list1El);

    expect(getComputedStyle(labelEls[0]).width).toBe('150px');
  }));

  it('should be accessible', async(() => {
    let fixture = TestBed.createComponent(SkyDefinitionListTestComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.nativeElement).toBeAccessible();
    });
  }));
});

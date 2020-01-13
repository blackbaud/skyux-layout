//#region imports

import {
  TestBed
} from '@angular/core/testing';

import {
  By
} from '@angular/platform-browser';

import {
  expect
} from '@skyux-sdk/testing';

import {
  SkyPageComponent
} from './page.component';

import {
  SkyPageTestComponent
} from './fixtures/page.component.fixture';

import {
  SkyPageFixturesModule
} from './fixtures/page-fixtures.module';

//#endregion

describe('Page component', () => {
  let styleEl: HTMLStyleElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkyPageFixturesModule]
    });

    styleEl = document.createElement('style');
    styleEl.appendChild(document.createTextNode('body { background-color: black; }'));

    document.head.appendChild(styleEl);
  });

  afterEach(() => {
    document.head.removeChild(styleEl);
  });

  it('should set the page\'s background color to white', () => {
    const fixture = TestBed.createComponent(SkyPageComponent);

    fixture.detectChanges();

    expect(getComputedStyle(document.body).backgroundColor).toBe('rgb(255, 255, 255)');
  });

  it('should display child contents and provide a theme', () => {
    const fixture = TestBed.createComponent(SkyPageTestComponent);

    fixture.detectChanges();

    expect(fixture.nativeElement).toHaveText('Test content');

    const themeOverrideEl = fixture.debugElement.query(By.css('.theme-override'));

    expect(getComputedStyle(themeOverrideEl.nativeElement).color).toBe('rgb(100, 100, 100)');
  });
});

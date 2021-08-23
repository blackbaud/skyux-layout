import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

import {
  element,
  by
} from 'protractor';

describe('Text Expand Repeater', () => {
  beforeEach(() => {
    SkyHostBrowser.get('visual/text-expand-repeater');
    SkyHostBrowser.setWindowBreakpoint('lg');
  });

  it('should match previous text expand repeater when not expanded', (done) => {
    expect('#text-expand-repeater').toMatchBaselineScreenshot(done, {
      screenshotName: 'text-expand-repeater-not-expanded'
    });
  });

  it('should match previous text expand repeater when not expanded (screen: xs)', (done) => {
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#text-expand-repeater').toMatchBaselineScreenshot(done, {
      screenshotName: 'text-expand-repeater-not-expanded-xs'
    });
  });

  it('should match the previous text expand repeater when expanded', (done) => {
    element(by.css('.sky-text-expand-repeater-see-more')).click();
    expect('#text-expand-repeater').toMatchBaselineScreenshot(done, {
      screenshotName: 'text-expand-repeater-expanded'
    });
    element(by.css('.sky-text-expand-repeater-see-more')).click();
  });

  it('should match the previous text expand repeater when expanded (screen: xs)', (done) => {
    SkyHostBrowser.setWindowBreakpoint('xs');
    element(by.css('.sky-text-expand-repeater-see-more')).click();
    expect('#text-expand-repeater').toMatchBaselineScreenshot(done, {
      screenshotName: 'text-expand-repeater-expanded-xs'
    });
    element(by.css('.sky-text-expand-repeater-see-more')).click();
  });

  it('should match previous text expand repeater (custom) when not expanded', (done) => {
    expect('#text-expand-repeater-custom-template').toMatchBaselineScreenshot(done, {
      screenshotName: 'text-expand-repeater-custom'
    });
  });

  it('should match the previous text expand repeater (custom) when expanded', (done) => {
    const buttonElement = by.css(
      '#text-expand-repeater-custom-template .sky-text-expand-repeater-see-more'
    );

    element(buttonElement).click();

    expect('#text-expand-repeater-custom-template').toMatchBaselineScreenshot(done, {
      screenshotName: 'text-expand-repeater-custom-expanded'
    });

    element(buttonElement).click();
  });
});

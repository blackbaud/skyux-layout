import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

import {
  element,
  by
} from 'protractor';

describe('Text Expand Repeater', () => {
  beforeEach(async () => {
    await SkyHostBrowser.get('visual/text-expand-repeater');
    await SkyHostBrowser.setWindowBreakpoint('lg');
  });

  it('should match previous text expand repeater when not expanded', (done) => {
    expect('#text-expand-repeater').toMatchBaselineScreenshot(done, {
      screenshotName: 'text-expand-repeater-not-expanded'
    });
  });

  it('should match previous text expand repeater when not expanded (screen: xs)', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#text-expand-repeater').toMatchBaselineScreenshot(done, {
      screenshotName: 'text-expand-repeater-not-expanded-xs'
    });
  });

  it('should match the previous text expand repeater when expanded', async (done) => {
    await element(by.css('.sky-text-expand-repeater-see-more')).click();
    expect('#text-expand-repeater').toMatchBaselineScreenshot(done, {
      screenshotName: 'text-expand-repeater-expanded'
    });
    await element(by.css('.sky-text-expand-repeater-see-more')).click();
  });

  it('should match the previous text expand repeater when expanded (screen: xs)', async (done) => {
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await element(by.css('.sky-text-expand-repeater-see-more')).click();
    expect('#text-expand-repeater').toMatchBaselineScreenshot(done, {
      screenshotName: 'text-expand-repeater-expanded-xs'
    });
    await element(by.css('.sky-text-expand-repeater-see-more')).click();
  });

  it('should match previous text expand repeater (custom) when not expanded', (done) => {
    expect('#text-expand-repeater-custom-template').toMatchBaselineScreenshot(done, {
      screenshotName: 'text-expand-repeater-custom'
    });
  });

  it('should match the previous text expand repeater (custom) when expanded', async (done) => {
    const buttonElement = by.css(
      '#text-expand-repeater-custom-template .sky-text-expand-repeater-see-more'
    );

    await element(buttonElement).click();

    expect('#text-expand-repeater-custom-template').toMatchBaselineScreenshot(done, {
      screenshotName: 'text-expand-repeater-custom-expanded'
    });

    await element(buttonElement).click();
  });
});

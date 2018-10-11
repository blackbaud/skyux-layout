import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

import {
  element,
  by
} from 'protractor';

describe('Text Expand Repeater', () => {
  it('should match previous text expand repeater when not expanded', (done) => {
    SkyHostBrowser.get('visual/text-expand-repeater');
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#text-expand-repeater').toMatchBaselineScreenshot(done, {
      screenshotName: 'text-expand-repeater-not-expanded'
    });
  });

  it('should match previous text expand repeater when not expanded (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/text-expand-repeater');
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#text-expand-repeater').toMatchBaselineScreenshot(done, {
      screenshotName: 'text-expand-repeater-not-expanded-xs'
    });
  });

  it('should match the previous text expand repeater when expanded', (done) => {
    SkyHostBrowser.get('visual/text-expand-repeater');
    SkyHostBrowser.setWindowBreakpoint('lg');
    element(by.css('.sky-text-expand-repeater-see-more')).click();
    expect('#text-expand-repeater').toMatchBaselineScreenshot(done, {
      screenshotName: 'text-expand-repeater-expanded'
    });
    element(by.css('.sky-text-expand-repeater-see-more')).click();
  });

  it('should match the previous text expand repeater when expanded (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/text-expand-repeater');
    SkyHostBrowser.setWindowBreakpoint('xs');
    element(by.css('.sky-text-expand-repeater-see-more')).click();
    expect('#text-expand-repeater').toMatchBaselineScreenshot(done, {
      screenshotName: 'text-expand-repeater-expanded-xs'
    });
    element(by.css('.sky-text-expand-repeater-see-more')).click();
  });
});

import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

import {
  by,
  element
} from 'protractor';

describe('Action Button', () => {
  beforeEach(() => {
    SkyHostBrowser.get('visual/action-button');
  });

  it('should match previous action button screenshot', (done) => {
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-action-button').toMatchBaselineScreenshot(done, {
      screenshotName: 'action-button'
    });
  });

  it('should match previous action button screenshot on small screens', (done) => {
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-action-button').toMatchBaselineScreenshot(done, {
      screenshotName: 'action-button-xs'
    });
  });

  it('should match previous action button containerscreenshot', (done) => {
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-action-button-container').toMatchBaselineScreenshot(done, {
      screenshotName: 'action-button-container'
    });
  });

  it('should match previous action button container screenshot on small screens', (done) => {
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-action-button-container').toMatchBaselineScreenshot(done, {
      screenshotName: 'action-button-container-xs'
    });
  });

  it('should match previous focused action button screenshot', (done) => {
    SkyHostBrowser.setWindowBreakpoint('lg');
    element(by.css('.screenshot-apply-focus-btn')).click().then(() => {
      expect('#screenshot-action-button').toMatchBaselineScreenshot(done, {
        screenshotName: 'action-button-focused'
      });
    });
  });
});

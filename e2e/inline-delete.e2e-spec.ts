import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

import {
  by,
  browser,
  element
} from 'protractor';

describe('Inline delete', () => {
  it('should match previous screenshot when inline delete is shown', (done) => {
    SkyHostBrowser.get('visual/inline-delete');
    SkyHostBrowser.setWindowBreakpoint('lg');
    element(by.css('#screenshot-inline-delete #inline-delete-trigger')).click();
    SkyHostBrowser.scrollTo('#screenshot-inline-delete');
    expect('#screenshot-inline-delete').toMatchBaselineScreenshot(done, {
      screenshotName: 'inline-delete'
    });
  });

  it('should match previous screenshot when inline delete is shown (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/inline-delete');
    SkyHostBrowser.setWindowBreakpoint('xs');
    element(by.css('#screenshot-inline-delete #inline-delete-trigger')).click();
    SkyHostBrowser.scrollTo('#screenshot-inline-delete');
    expect('#screenshot-inline-delete').toMatchBaselineScreenshot(done, {
      screenshotName: 'inline-delete-xs'
    });
  });

  it('should match previous screenshot when inline delete is shown and pending', (done) => {
    SkyHostBrowser.get('visual/inline-delete');
    SkyHostBrowser.setWindowBreakpoint('lg');
    element(by.css('#screenshot-inline-delete #inline-delete-trigger')).click();
    element(by.css('#pending-trigger')).click();
    SkyHostBrowser.scrollTo('#screenshot-inline-delete');
    browser.pause();
    expect('#screenshot-inline-delete').toMatchBaselineScreenshot(done, {
      screenshotName: 'inline-delete-pending'
    });
  });

  it('should match previous screenshot when inline delete is shown and pending (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/inline-delete');
    SkyHostBrowser.setWindowBreakpoint('xs');
    element(by.css('#screenshot-inline-delete #inline-delete-trigger')).click();
    element(by.css('#pending-trigger')).click();
    SkyHostBrowser.scrollTo('#screenshot-inline-delete');
    expect('#screenshot-inline-delete').toMatchBaselineScreenshot(done, {
      screenshotName: 'inline-delete-pending-xs'
    });
  });
});

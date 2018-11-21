import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

import {
  element,
  by
} from 'protractor';

describe('Summary Actionbar', () => {
  it('should match previous summary actionbar screenshot', (done) => {
    SkyHostBrowser.get('visual/summary-actionbar');
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('.sky-summary-actionbar').toMatchBaselineScreenshot(done, {
      screenshotName: 'summary-actionbar'
    });
  });

  it('should match previous expanded summary actionbar screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/summary-actionbar');
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('.sky-summary-actionbar').toMatchBaselineScreenshot(done, {
      screenshotName: 'summary-actionbar-expanded'
    });
  });

  it('should match previous collapsed summary actionbar screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/summary-actionbar');
    SkyHostBrowser.setWindowBreakpoint('xs');
    element(by.css('#summary-actionbar .sky-summary-actionbar-details-collapse .sky-btn-secondary')).click();
    expect('.sky-summary-actionbar').toMatchBaselineScreenshot(done, {
      screenshotName: 'summary-actionbar-collapsed'
    });
  });

  it('should match previous summary actionbar modal screenshot', (done) => {
    SkyHostBrowser.get('visual/summary-actionbar');
    SkyHostBrowser.setWindowBreakpoint('lg');
    element(by.css('#modal-trigger')).click();
    expect('.sky-modal').toMatchBaselineScreenshot(done, {
      screenshotName: 'summary-actionbar-modal'
    });
  });

  it('should match previous expanded summary actionbar modal screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/summary-actionbar');
    element(by.css('#modal-trigger')).click();
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('.sky-modal').toMatchBaselineScreenshot(done, {
      screenshotName: 'summary-actionbar-modal-expanded'
    });
  });

  it('should match previous collapsed summary actionbar modal screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/summary-actionbar');
    element(by.css('#modal-trigger')).click();
    SkyHostBrowser.setWindowBreakpoint('xs');
    element(by.css('.sky-modal .sky-summary-actionbar-details-collapse .sky-btn-secondary')).click();
    expect('.sky-modal').toMatchBaselineScreenshot(done, {
      screenshotName: 'summary-actionbar-modal-collapsed'
    });
  });

  it('should match previous summary actionbar full screen modal screenshot', (done) => {
    SkyHostBrowser.get('visual/summary-actionbar');
    SkyHostBrowser.setWindowBreakpoint('lg');
    element(by.css('#full-modal-trigger')).click();
    expect('.sky-modal').toMatchBaselineScreenshot(done, {
      screenshotName: 'summary-actionbar-full-modal'
    });
  });

  it('should match previous expanded summary actionbar modal full screen screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/summary-actionbar');
    element(by.css('#full-modal-trigger')).click();
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('.sky-modal').toMatchBaselineScreenshot(done, {
      screenshotName: 'summary-actionbar-full-modal-expanded'
    });
  });

  it('should match previous collapsed summary actionbar full screen modal screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/summary-actionbar');
    element(by.css('#full-modal-trigger')).click();
    SkyHostBrowser.setWindowBreakpoint('xs');
    element(by.css('.sky-modal .sky-summary-actionbar-details-collapse .sky-btn-secondary')).click();
    expect('.sky-modal').toMatchBaselineScreenshot(done, {
      screenshotName: 'summary-actionbar-full-modal-collapsed'
    });
  });
});

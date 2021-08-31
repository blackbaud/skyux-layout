import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

import {
  element,
  by
} from 'protractor';

describe('Text Expand', () => {
  it('should match previous text expands when not expanded', async (done) => {
    await SkyHostBrowser.get('visual/text-expand');
    await SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#text-expands').toMatchBaselineScreenshot(done, {
      screenshotName: 'text-expand-not-expanded'
    });
  });

  it('should match previous text expands when not expanded (screen: xs)', async (done) => {
    await SkyHostBrowser.get('visual/text-expand');
    await SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#text-expands').toMatchBaselineScreenshot(done, {
      screenshotName: 'text-expand-not-expanded-xs'
    });
  });

  it('should match the previous normal text expand when expanded', async (done) => {
    await SkyHostBrowser.get('visual/text-expand');
    await SkyHostBrowser.setWindowBreakpoint('lg');
    await element(by.css('#normal-text-expand .sky-text-expand-see-more')).click();
    expect('#normal-text-expand').toMatchBaselineScreenshot(done, {
      screenshotName: 'text-expand-normal-expanded'
    });
    await element(by.css('#normal-text-expand .sky-text-expand-see-more')).click();
  });

  it('should match the previous normal text expand when expanded (screen: xs)', async (done) => {
    await SkyHostBrowser.get('visual/text-expand');
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await element(by.css('#normal-text-expand .sky-text-expand-see-more')).click();
    expect('#normal-text-expand').toMatchBaselineScreenshot(done, {
      screenshotName: 'text-expand-normal-expanded-xs'
    });
    await element(by.css('#normal-text-expand .sky-text-expand-see-more')).click();
  });

  it('should match previous modal text expand when expanded', async (done) => {
    await SkyHostBrowser.get('visual/text-expand');
    await SkyHostBrowser.setWindowBreakpoint('lg');
    await element(by.css('#modal-text-expand .sky-text-expand-see-more')).click();
    expect('.sky-modal').toMatchBaselineScreenshot(done, {
      screenshotName: 'text-expand-modal-expanded'
    });
    await element(by.css('.sky-modal .sky-modal-btn-close')).click();
  });

  it('should match previous modal text expand when expanded (screen: xs)', async (done) => {
    await SkyHostBrowser.get('visual/text-expand');
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await element(by.css('#modal-text-expand .sky-text-expand-see-more')).click();
    expect('.sky-modal').toMatchBaselineScreenshot(done, {
      screenshotName: 'text-expand-modal-expanded-xs'
    });
    await element(by.css('.sky-modal .sky-modal-btn-close')).click();
  });

  it('should match previous text expand without truncated newlines', async (done) => {
    await SkyHostBrowser.get('visual/text-expand');
    await SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-truncate-text-w-newlines').toMatchBaselineScreenshot(done, {
      screenshotName: 'text-expand-w-newlines'
    });
  });

  it('should match previous text expand without truncated newlines (screen: xs)', async (done) => {
    await SkyHostBrowser.get('visual/text-expand');
    await SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-truncate-text-w-newlines').toMatchBaselineScreenshot(done, {
      screenshotName: 'text-expand-w-newlines-xs'
    });
  });

  it('should match previous modal text expand when expanded with unbroken text', async (done) => {
    await SkyHostBrowser.get('visual/text-expand');
    await SkyHostBrowser.setWindowBreakpoint('lg');
    await element(by.css('#screenshot-modal-text-expand-unbroken .sky-text-expand-see-more')).click();
    expect('.sky-modal').toMatchBaselineScreenshot(done, {
      screenshotName: 'text-expand-modal-expanded-unbroken'
    });
    await element(by.css('.sky-modal .sky-modal-btn-close')).click();
  });

  it('should match previous modal text expand when expanded with unbroken text (screen: xs)', async (done) => {
    await SkyHostBrowser.get('visual/text-expand');
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await element(by.css('#screenshot-modal-text-expand-unbroken .sky-text-expand-see-more')).click();
    expect('.sky-modal').toMatchBaselineScreenshot(done, {
      screenshotName: 'text-expand-modal-expanded-unbroken-xs'
    });
    await element(by.css('.sky-modal .sky-modal-btn-close')).click();
  });
});

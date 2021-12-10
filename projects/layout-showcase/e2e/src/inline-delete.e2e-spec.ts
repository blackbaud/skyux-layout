import { expect, SkyHostBrowser } from '@skyux-sdk/e2e';

import { by, element } from 'protractor';

describe('Inline delete', () => {
  it('should match previous screenshot when inline delete is shown', async (done) => {
    await SkyHostBrowser.get('visual/inline-delete');
    await SkyHostBrowser.setWindowBreakpoint('lg');
    await element(
      by.css('#screenshot-inline-delete #inline-delete-trigger')
    ).click();
    await SkyHostBrowser.scrollTo('#screenshot-inline-delete');
    expect('#screenshot-inline-delete').toMatchBaselineScreenshot(done, {
      screenshotName: 'inline-delete',
    });
  });

  it('should match previous screenshot when inline delete is shown (screen: xs)', async (done) => {
    await SkyHostBrowser.get('visual/inline-delete');
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await element(
      by.css('#screenshot-inline-delete #inline-delete-trigger')
    ).click();
    await SkyHostBrowser.scrollTo('#screenshot-inline-delete');
    expect('#screenshot-inline-delete').toMatchBaselineScreenshot(done, {
      screenshotName: 'inline-delete-xs',
    });
  });

  it('should match previous screenshot when inline delete is shown and pending', async (done) => {
    await SkyHostBrowser.get('visual/inline-delete');
    await SkyHostBrowser.setWindowBreakpoint('lg');
    await element(
      by.css('#screenshot-inline-delete #inline-delete-trigger')
    ).click();
    await element(by.css('#pending-trigger')).click();
    await SkyHostBrowser.scrollTo('#screenshot-inline-delete');
    expect('#screenshot-inline-delete').toMatchBaselineScreenshot(done, {
      screenshotName: 'inline-delete-pending',
    });
  });

  it('should match previous screenshot when inline delete is shown and pending (screen: xs)', async (done) => {
    await SkyHostBrowser.get('visual/inline-delete');
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await element(
      by.css('#screenshot-inline-delete #inline-delete-trigger')
    ).click();
    await element(by.css('#pending-trigger')).click();
    await SkyHostBrowser.scrollTo('#screenshot-inline-delete');
    expect('#screenshot-inline-delete').toMatchBaselineScreenshot(done, {
      screenshotName: 'inline-delete-pending-xs',
    });
  });
});

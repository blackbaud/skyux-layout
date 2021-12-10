import { expect, SkyHostBrowser } from '@skyux-sdk/e2e';

describe('Page', () => {
  it('should match previous page screenshot', async (done) => {
    await SkyHostBrowser.get('visual/page');
    await SkyHostBrowser.setWindowBreakpoint('lg');

    expect('#screenshot-page').toMatchBaselineScreenshot(done, {
      screenshotName: 'page',
    });
  });
});

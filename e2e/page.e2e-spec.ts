import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

describe('Page', () => {
  it('should match previous page screenshot', (done) => {
    SkyHostBrowser.get('visual/page');
    SkyHostBrowser.setWindowBreakpoint('lg');

    expect('#screenshot-page').toMatchBaselineScreenshot(done, {
      screenshotName: 'page'
    });
  });
});

import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

describe('Toolbar', () => {
  it('should match previous toolbar screenshot', (done) => {
    SkyHostBrowser.get('visual/toolbar');
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-toolbar').toMatchBaselineScreenshot(done, {
      screenshotName: 'toolbar'
    });
  });

  it('should match previous toolbar screenshot with sections', (done) => {
    SkyHostBrowser.get('visual/toolbar');
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-toolbar-sectioned').toMatchBaselineScreenshot(done, {
      screenshotName: 'toolbar-section'
    });
  });
});

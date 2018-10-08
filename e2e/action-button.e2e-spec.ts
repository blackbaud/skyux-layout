import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

describe('Action Button', () => {
  it('should match previous action button screenshot', (done) => {
    SkyHostBrowser.get('visual/action-button');
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-action-button').toMatchBaselineScreenshot(done, {
      screenshotName: 'action-button'
    });
  });

  it('should match previous action button screenshot on small screens', (done) => {
    SkyHostBrowser.get('visual/action-button');
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-action-button').toMatchBaselineScreenshot(done, {
      screenshotName: 'action-button-xs'
    });
  });

  it('should match previous action button containerscreenshot', (done) => {
    SkyHostBrowser.get('visual/action-button');
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-action-button-container').toMatchBaselineScreenshot(done, {
      screenshotName: 'action-button-container'
    });
  });

  it('should match previous action button container screenshot on small screens', (done) => {
    SkyHostBrowser.get('visual/action-button');
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-action-button-container').toMatchBaselineScreenshot(done, {
      screenshotName: 'action-button-container-xs'
    });
  });
});

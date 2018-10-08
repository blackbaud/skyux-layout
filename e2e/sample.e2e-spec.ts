import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

describe('Sample', () => {
  it('should match previous screenshot', (done) => {
    SkyHostBrowser.get('visual/sample');
    SkyHostBrowser.setWindowBreakpoint('lg');
    SkyHostBrowser.scrollTo('.sky-sample-demo');
    expect('.sky-sample-demo').toMatchBaselineScreenshot(done);
  });

  it('should match previous screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/sample');
    SkyHostBrowser.setWindowBreakpoint('xs');
    SkyHostBrowser.scrollTo('.sky-sample-demo');
    expect('.sky-sample-demo').toMatchBaselineScreenshot(done);
  });
});

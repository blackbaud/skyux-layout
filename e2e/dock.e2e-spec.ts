import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

describe('Dock', function () {

  beforeEach(function () {
    SkyHostBrowser.get('visual/dock');
    SkyHostBrowser.setWindowBreakpoint('md');
    SkyHostBrowser.scrollTo('.scroll-bottom-label');
  });

  it('should match screenshot', function (done) {
    expect('#screenshot-dock').toMatchBaselineScreenshot(done, {
      screenshotName: 'dock'
    });
  });

});

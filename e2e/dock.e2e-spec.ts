import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

describe('Dock', function () {

  beforeEach(function (done) {
    SkyHostBrowser.get('visual/dock')
      .then(() => SkyHostBrowser.setWindowBreakpoint('md'))
      .then(() => done());
  });

  it('should match screenshot', function (done) {
    SkyHostBrowser.scrollTo('.scroll-bottom-label')
      .then(() => {
        expect('body').toMatchBaselineScreenshot(done, {
          screenshotName: 'dock'
        });
      });
  });

});

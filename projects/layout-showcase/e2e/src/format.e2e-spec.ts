import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

describe('Format', function () {

  beforeEach(async () => {
    await SkyHostBrowser.get('visual/format');
  });

  it('should match screenshot', function (done) {
    expect('#screenshot-format').toMatchBaselineScreenshot(done, {
      screenshotName: 'format'
    });
  });

});

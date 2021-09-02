import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

describe('Back to top', () => {
  it('should match previous screenshot', async (done) => {
    await SkyHostBrowser.get('visual/back-to-top');
    await SkyHostBrowser.scrollTo('p:last-child');
    expect('#screenshot-window').toMatchBaselineScreenshot(done, {
      screenshotName: 'infinite-scroll-back-to-top'
    });
  });

  it('should match previous screenshot with scrollable parent element', async (done) => {
    await SkyHostBrowser.get('visual/back-to-top-scrollable-parent');
    await SkyHostBrowser.scrollTo('p:last-child');
    expect('#screenshot-window').toMatchBaselineScreenshot(done, {
      screenshotName: 'infinite-scroll-back-to-top-scrollable-parent'
    });
  });

  it('should match previous screenshot with message stream and no button', async (done) => {
    await SkyHostBrowser.get('visual/back-to-top-message-stream');
    await SkyHostBrowser.scrollTo('p:last-child');
    expect('#screenshot-window').toMatchBaselineScreenshot(done, {
      screenshotName: 'back-to-top-message-stream'
    });
  });
});

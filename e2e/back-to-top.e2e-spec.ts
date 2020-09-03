import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

describe('Back to top', () => {
  it('should match previous screenshot', (done) => {
    SkyHostBrowser.get('visual/back-to-top');
    SkyHostBrowser.scrollTo('p:last-child');
    expect('#screenshot-window').toMatchBaselineScreenshot(done, {
      screenshotName: 'infinite-scroll-back-to-top'
    });
  });

  it('should match previous screenshot with scrollable parent element', (done) => {
    SkyHostBrowser.get('visual/back-to-top-scrollable-parent');
    SkyHostBrowser.scrollTo('p:last-child');
    expect('#screenshot-window').toMatchBaselineScreenshot(done, {
      screenshotName: 'infinite-scroll-back-to-top-scrollable-parent'
    });
  });

  it('should match previous screenshot with message stream and no button', (done) => {
    SkyHostBrowser.get('visual/back-to-top-message-stream');
    SkyHostBrowser.scrollTo('p:last-child');
    expect('#screenshot-window').toMatchBaselineScreenshot(done, {
      screenshotName: 'back-to-top-message-stream'
    });
  });
});

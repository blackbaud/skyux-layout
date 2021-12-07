import { expect, SkyHostBrowser } from '@skyux-sdk/e2e';

describe('Definition List', () => {
  it('should match definition list screenshot with default settings', async (done) => {
    await SkyHostBrowser.get('visual/definition-list');
    await SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-definition-list-1').toMatchBaselineScreenshot(done, {
      screenshotName: 'definition-list-defaults',
    });
  });

  it('should match definition list screenshot with default settings (screen: xs)', async (done) => {
    await SkyHostBrowser.get('visual/definition-list');
    await SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-definition-list-1').toMatchBaselineScreenshot(done, {
      screenshotName: 'definition-list-defaults-xs',
    });
  });

  it('should match definition list screenshot with default settings', async (done) => {
    await SkyHostBrowser.get('visual/definition-list');
    await SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-definition-list-1').toMatchBaselineScreenshot(done, {
      screenshotName: 'definition-list-defaults',
    });
  });

  it('should match definition list screenshot with default settings (screen: xs)', async (done) => {
    await SkyHostBrowser.get('visual/definition-list');
    await SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-definition-list-1').toMatchBaselineScreenshot(done, {
      screenshotName: 'definition-list-defaults-xs',
    });
  });

  it('should match definition list screenshot with long text', async (done) => {
    await SkyHostBrowser.get('visual/definition-list');
    await SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-definition-list-3').toMatchBaselineScreenshot(done, {
      screenshotName: 'definition-list-long-text',
    });
  });

  it('should match definition list screenshot with long text (screen: xs)', async (done) => {
    await SkyHostBrowser.get('visual/definition-list');
    await SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-definition-list-3').toMatchBaselineScreenshot(done, {
      screenshotName: 'definition-list-long-text-xs',
    });
  });
});

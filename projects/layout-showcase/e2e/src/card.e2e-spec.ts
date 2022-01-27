import { expect, SkyHostBrowser } from '@skyux-sdk/e2e';

import { element, by } from 'protractor';

describe('Card', () => {
  it('should match previous screenshot when all components are present', async (done) => {
    await SkyHostBrowser.get('visual/card');
    await SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-card-all').toMatchBaselineScreenshot(done, {
      screenshotName: 'card-all',
    });
  });

  it('should match previous screenshot when all components are present (screen: xs)', async (done) => {
    await SkyHostBrowser.get('visual/card');
    await SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-card-all').toMatchBaselineScreenshot(done, {
      screenshotName: 'card-all-xs',
    });
  });

  it('should match previous screenshot when no header is present', async (done) => {
    await SkyHostBrowser.get('visual/card');
    await SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-card-noheader').toMatchBaselineScreenshot(done, {
      screenshotName: 'card-noheader',
    });
  });

  it('should match previous screenshot when no header is present (screen: xs)', async (done) => {
    await SkyHostBrowser.get('visual/card');
    await SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-card-noheader').toMatchBaselineScreenshot(done, {
      screenshotName: 'card-noheader-xs',
    });
  });

  it('should match previous screenshot when no actions are present', async (done) => {
    await SkyHostBrowser.get('visual/card');
    await SkyHostBrowser.setWindowBreakpoint('lg');
    await SkyHostBrowser.scrollTo('#screenshot-card-noactions');
    expect('#screenshot-card-noactions').toMatchBaselineScreenshot(done, {
      screenshotName: 'card-noactions',
    });
  });

  it('should match previous screenshot when no actions are present (screen: xs)', async (done) => {
    await SkyHostBrowser.get('visual/card');
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await SkyHostBrowser.scrollTo('#screenshot-card-noactions');
    expect('#screenshot-card-noactions').toMatchBaselineScreenshot(done, {
      screenshotName: 'card-noactions-xs',
    });
  });

  it('should match previous screenshot when selectable', async (done) => {
    await SkyHostBrowser.get('visual/card');
    await SkyHostBrowser.setWindowBreakpoint('lg');
    await SkyHostBrowser.scrollTo('#screenshot-card-selectable');
    expect('#screenshot-card-selectable').toMatchBaselineScreenshot(done, {
      screenshotName: 'card-selectable',
    });
  });

  it('should match previous screenshot when selectable (screen: xs)', async (done) => {
    await SkyHostBrowser.get('visual/card');
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await SkyHostBrowser.scrollTo('#screenshot-card-selectable');
    expect('#screenshot-card-selectable').toMatchBaselineScreenshot(done, {
      screenshotName: 'card-selectable-xs',
    });
  });

  it('should match previous screenshot when the card is selected', async (done) => {
    await SkyHostBrowser.get('visual/card');
    await SkyHostBrowser.setWindowBreakpoint('lg');
    await SkyHostBrowser.scrollTo('#screenshot-card-selectable');
    await element(
      by.css('#screenshot-card-selectable .sky-card-title')
    ).click();
    expect('#screenshot-card-selectable').toMatchBaselineScreenshot(done, {
      screenshotName: 'card-selected',
    });
  });

  it('should match previous screenshot when the card is selected (screen: xs)', async (done) => {
    await SkyHostBrowser.get('visual/card');
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await SkyHostBrowser.scrollTo('#screenshot-card-selectable');
    await element(
      by.css('#screenshot-card-selectable .sky-card-title')
    ).click();
    expect('#screenshot-card-selectable').toMatchBaselineScreenshot(done, {
      screenshotName: 'card-selected-xs',
    });
  });

  it('should match previous screenshot when the card has title overflow', async (done) => {
    await SkyHostBrowser.get('visual/card');
    await SkyHostBrowser.setWindowBreakpoint('lg');
    await SkyHostBrowser.scrollTo('#screenshot-card-overflow');
    expect('#screenshot-card-overflow').toMatchBaselineScreenshot(done, {
      screenshotName: 'card-title-overflow',
    });
  });

  it('should match previous screenshot when the card has title overflow (screen: xs)', async (done) => {
    await SkyHostBrowser.get('visual/card');
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await SkyHostBrowser.scrollTo('#screenshot-card-overflow');
    expect('#screenshot-card-overflow').toMatchBaselineScreenshot(done, {
      screenshotName: 'card-title-overflow-xs',
    });
  });

  it('should match previous screenshot when the card has inline delete enabled', async (done) => {
    await SkyHostBrowser.get('visual/card');
    await SkyHostBrowser.setWindowBreakpoint('lg');
    await element(
      by.css('#screenshot-card-inline-delete #inline-delete-trigger')
    ).click();
    await SkyHostBrowser.scrollTo('#screenshot-card-inline-delete');
    expect('#screenshot-card-inline-delete').toMatchBaselineScreenshot(done, {
      screenshotName: 'card-title-inline-delete',
    });
  });

  it('should match previous screenshot when the card has inline delete enabled (screen: xs)', async (done) => {
    await SkyHostBrowser.get('visual/card');
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await element(
      by.css('#screenshot-card-inline-delete #inline-delete-trigger')
    ).click();
    await SkyHostBrowser.scrollTo('#screenshot-card-inline-delete');
    expect('#screenshot-card-inline-delete').toMatchBaselineScreenshot(done, {
      screenshotName: 'card-title-inline-delete-xs',
    });
  });
});

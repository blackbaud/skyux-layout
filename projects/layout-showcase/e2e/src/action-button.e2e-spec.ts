import {
  SkyHostBrowserBreakpoint
} from '@skyux-sdk/e2e/host-browser/host-browser-breakpoint';

import {
  expect,
  SkyHostBrowser,
  SkyVisualThemeSelector
} from '@skyux-sdk/e2e';

import {
  browser,
  by,
  element
} from 'protractor';

describe('Action Button', () => {

  //#region helpers
  let browserSize: SkyHostBrowserBreakpoint;
  let currentTheme: string;
  let currentThemeMode: string;

  async function selectTheme(theme: string, mode: string): Promise<void> {
    currentTheme = theme;
    currentThemeMode = mode;

    return SkyVisualThemeSelector.selectTheme(theme, mode);
  }

  async function setBrowserSize(size: SkyHostBrowserBreakpoint): Promise<void> {
    browserSize = size;

    return SkyHostBrowser.setWindowBreakpoint(size);
  }

  function getScreenshotName(name: string): string {
    if (browserSize) {
      name += '-' + browserSize;
    }

    if (currentTheme) {
      name += '-' + currentTheme;
    }

    if (currentThemeMode) {
      name += '-' + currentThemeMode;
    }

    return name;
  }

  function runTests(): void {
    it('should match previous screenshot', async (done) => {
      await SkyHostBrowser.scrollTo('#screenshot-action-button');
      expect('#screenshot-action-button')
        .toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('action-button')
        });
    });

    it('should match previous screenshot with action buttons inside container', async (done) => {
      await SkyHostBrowser.scrollTo('#screenshot-action-button-container');
      expect('#screenshot-action-button-container')
        .toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('action-button-container')
        });
    });

    if (currentTheme === 'modern') {
      it('should match previous screenshot when left aligned', async (done) => {
        await SkyHostBrowser.scrollTo('#screenshot-action-button-container');
        await element(by.css('#screenshot-action-button-left-align')).click();
        expect('#screenshot-action-button-container')
          .toMatchBaselineScreenshot(done, {
            screenshotName: getScreenshotName('action-button-container-left-aligned')
          });
      });
    }

    it('should match previous screenshot when button in hover state', async (done) => {
      await SkyHostBrowser.scrollTo('#screenshot-action-button');
      await browser.actions().mouseMove(
        element(by.css('#screenshot-action-button .sky-action-button'))
      ).perform();
      expect('#screenshot-action-button')
        .toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('action-button-hover')
        });
    });

    it('should match previous screenshot when button in focused state', async (done) => {
      await SkyHostBrowser.scrollTo('#screenshot-action-button');
      await element(by.css('#screenshot-action-button .sky-action-button')).click();
      expect('#screenshot-action-button')
        .toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('action-button-focused')
        });
    });
  }
  //#endregion

  describe('(size: lg)', () => {
    beforeEach( async() => {
      currentTheme = undefined;
      currentThemeMode = undefined;
      await SkyHostBrowser.get('visual/action-button');
      await setBrowserSize('lg');
    });

    runTests();

    describe('when modern theme', () => {
      beforeEach(async () => {
        await selectTheme('modern', 'light');
      });

      runTests();
    });

    describe('when modern theme in dark mode', () => {
      beforeEach(async () => {
        await selectTheme('modern', 'dark');
      });

      runTests();
    });
  });

  describe('(size: xs)', () => {
    beforeEach( async() => {
      currentTheme = undefined;
      currentThemeMode = undefined;
      await SkyHostBrowser.get('visual/action-button');
      await setBrowserSize('xs');
    });

    runTests();

    describe('when modern theme', () => {
      beforeEach(async () => {
        await selectTheme('modern', 'light');
      });

      runTests();
    });

    describe('when modern theme in dark mode', () => {
      beforeEach(async () => {
        await selectTheme('modern', 'dark');
      });

      runTests();
    });
  });
});

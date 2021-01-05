import {
  SkyHostBrowserBreakpoint
} from '@skyux-sdk/e2e/host-browser/host-browser-breakpoint';

import {
  expect,
  SkyHostBrowser,
  SkyVisualThemeSelector
} from '@skyux-sdk/e2e';

import {
  element,
  by
} from 'protractor';

describe('Definition List', () => {

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
    describe('fixed width mode', () => {
      it('should match previous screenshot', async (done) => {
        await SkyHostBrowser.scrollTo('#screenshot-definition-list-fixed-width-mode');
        expect('#screenshot-definition-list-fixed-width-mode').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('definition-list-fixed-width-mode')
        });
      });

      it('should match previous screenshot with long text', async (done) => {
        element(by.css('#show-long-label-button')).click();
        await SkyHostBrowser.scrollTo('#screenshot-definition-list-fixed-width-mode');
        expect('#screenshot-definition-list-fixed-width-mode').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('definition-list-fixed-width-mode-long-text')
        });
      });
    });

    describe('name-value pair mode', () => {
      it('should match previous screenshot', async (done) => {
        await SkyHostBrowser.scrollTo('#screenshot-definition-list-name-value-pair-mode');
        expect('#screenshot-definition-list-name-value-pair-mode').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('definition-list-name-value-pair-mode')
        });
      });

      it('should match previous screenshot with vertical orientation', async (done) => {
        await SkyHostBrowser.scrollTo('#screenshot-definition-list-name-value-pair-mode-vertical');
        expect('#screenshot-definition-list-name-value-pair-mode-vertical')
          .toMatchBaselineScreenshot(done, {
            screenshotName: getScreenshotName('definition-list-name-value-pair-mode-vertical')
          });
      });
    });

    describe('term description mode', async () => {
      await SkyHostBrowser.scrollTo('#screenshot-definition-list-term-description-mode');
      it('should match previous screenshot', async (done) => {
        expect('#screenshot-definition-list-term-description-mode')
          .toMatchBaselineScreenshot(done, {
            screenshotName: getScreenshotName('definition-list-term-description-mode')
          });
      });
    });
  }
  //#endregion

  describe('(size: lg)', () => {
    beforeEach( async() => {
      currentTheme = undefined;
      currentThemeMode = undefined;
      await SkyHostBrowser.get('visual/definition-list');
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
      await SkyHostBrowser.get('visual/definition-list');
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

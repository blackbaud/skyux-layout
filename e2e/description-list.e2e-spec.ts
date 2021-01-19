import {
  SkyHostBrowserBreakpoint
} from '@skyux-sdk/e2e/host-browser/host-browser-breakpoint';

import {
  expect,
  SkyHostBrowser,
  SkyVisualThemeSelector
} from '@skyux-sdk/e2e';

describe('Description List', () => {

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
    describe('default mode', () => {
      it('should match previous screenshot with horizontal orientation', async (done) => {
        await SkyHostBrowser.scrollTo('#screenshot-description-list-default-mode-horizontal');
        expect('#screenshot-description-list-default-mode-horizontal').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('description-list-default-mode-horizontal')
        });
      });

      it('should match previous screenshot with vertical orientation', async (done) => {
        await SkyHostBrowser.scrollTo('#screenshot-description-list-default-mode-vertical');
        expect('#screenshot-description-list-default-mode-vertical')
          .toMatchBaselineScreenshot(done, {
            screenshotName: getScreenshotName('description-list-default-mode-vertical')
          });
      });
    });

    describe('term description mode', async () => {
      await SkyHostBrowser.scrollTo('#screenshot-description-list-long-description-mode');
      it('should match previous screenshot', async (done) => {
        expect('#screenshot-description-list-long-description-mode')
          .toMatchBaselineScreenshot(done, {
            screenshotName: getScreenshotName('description-list-long-description-mode')
          });
      });
    });
  }
  //#endregion

  describe('(size: lg)', () => {
    beforeEach( async() => {
      currentTheme = undefined;
      currentThemeMode = undefined;
      await SkyHostBrowser.get('visual/description-list');
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
      await SkyHostBrowser.get('visual/description-list');
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

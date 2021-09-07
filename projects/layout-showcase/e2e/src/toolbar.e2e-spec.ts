import {
  expect,
  SkyHostBrowser,
  SkyVisualThemeSelector
} from '@skyux-sdk/e2e';

describe('Toolbar', () => {
  let currentTheme: string;
  let currentThemeMode: string;

  async function selectTheme(theme: string, mode: string): Promise<void> {
    currentTheme = theme;
    currentThemeMode = mode;

    return SkyVisualThemeSelector.selectTheme(theme, mode);
  }

  function getScreenshotName(name: string): string {
    if (currentTheme) {
      name += '-' + currentTheme;
    }

    if (currentThemeMode) {
      name += '-' + currentThemeMode;
    }

    return name;
  }

  async function validateBasic(done: DoneFn): Promise<void> {
    await SkyHostBrowser.setWindowBreakpoint('lg');
    await SkyHostBrowser.scrollTo('#screenshot-toolbar');

    expect('#screenshot-toolbar').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('toolbar')
    });
  }

  async function validateBasicXs(done: DoneFn): Promise<void> {
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await SkyHostBrowser.scrollTo('#screenshot-toolbar');

    expect('#screenshot-toolbar').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('toolbar-xs')
    });
  }

  async function validateSections(done: DoneFn): Promise<void> {
    await SkyHostBrowser.setWindowBreakpoint('lg');
    await SkyHostBrowser.scrollTo('#screenshot-toolbar-sectioned');

    expect('#screenshot-toolbar-sectioned').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('toolbar-section')
    });
  }

  async function validateSectionsXs(done: DoneFn): Promise<void> {
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await SkyHostBrowser.scrollTo('#screenshot-toolbar-sectioned');

    expect('#screenshot-toolbar-sectioned').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('toolbar-section-xs')
    });
  }

  async function validateViewkeeper(done: DoneFn): Promise<void> {
    await SkyHostBrowser.setWindowBreakpoint('lg');
    await SkyHostBrowser.scrollTo('#viewkeeper-bottom');

    expect('#screenshot-toolbar-viewkeeper .sky-toolbar-container')
      .toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('toolbar-viewkeeper')
      });
  }

  async function validateViewkeeperXs(done: DoneFn): Promise<void> {
    await SkyHostBrowser.setWindowBreakpoint('xs');
    await SkyHostBrowser.scrollTo('#viewkeeper-bottom');

    expect('#screenshot-toolbar-viewkeeper .sky-toolbar-container')
      .toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('toolbar-viewkeeper-xs')
      });
  }

  beforeEach(async () => {
    currentTheme = undefined;
    currentThemeMode = undefined;

    await SkyHostBrowser.get('visual/toolbar');
  });

  it('should match previous toolbar screenshot', async (done) => {
    await validateBasic(done);
  });

  it('should match previous toolbar screenshot (screen: xs)', async (done) => {
    await validateBasicXs(done);
  });

  it('should match previous toolbar screenshot with sections', async (done) => {
    await validateSections(done);
  });

  it('should match previous toolbar screenshot with sections (screen: xs)', async (done) => {
    await validateSectionsXs(done);
  });

  it('should match previous toolbar screenshot with a viewkeeper', async (done) => {
    await validateViewkeeper(done);
  });

  it('should match previous toolbar screenshot with a viewkeeper (screen: xs)', async (done) => {
    await validateViewkeeperXs(done);
  });

  describe('when modern theme', () => {

    beforeEach(async () => {
      await selectTheme('modern', 'light');
    });

    it('should match previous toolbar screenshot', async (done) => {
      await validateBasic(done);
    });

    it('should match previous toolbar screenshot (screen: xs)', async (done) => {
      await validateBasicXs(done);
    });

    it('should match previous toolbar screenshot with sections', async (done) => {
      await validateSections(done);
    });

    it('should match previous toolbar screenshot with sections (screen: xs)', async (done) => {
      await validateSectionsXs(done);
    });

    it('should match previous toolbar screenshot with a viewkeeper', async (done) => {
      await validateViewkeeper(done);
    });

    it('should match previous toolbar screenshot with a viewkeeper (screen: xs)', async (done) => {
      await validateViewkeeperXs(done);
    });

  });

  describe('when modern theme in dark mode', () => {

    beforeEach(async () => {
      await selectTheme('modern', 'dark');
    });

    it('should match previous toolbar screenshot', async (done) => {
      await validateBasic(done);
    });

    it('should match previous toolbar screenshot (screen: xs)', async (done) => {
      await validateBasicXs(done);
    });

    it('should match previous toolbar screenshot with sections', async (done) => {
      await validateSections(done);
    });

    it('should match previous toolbar screenshot with sections (screen: xs)', async (done) => {
      await validateSectionsXs(done);
    });

    it('should match previous toolbar screenshot with a viewkeeper', async (done) => {
      await validateViewkeeper(done);
    });

    it('should match previous toolbar screenshot with a viewkeeper (screen: xs)', async (done) => {
      await validateViewkeeperXs(done);
    });

  });

});

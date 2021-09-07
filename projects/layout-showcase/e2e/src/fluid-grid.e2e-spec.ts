import {
  expect,
  SkyHostBrowser,
  SkyVisualThemeSelector
} from '@skyux-sdk/e2e';

import {
  by,
  element
} from 'protractor';

describe('Fluid Grid', () => {
  let currentTheme: string;
  let currentThemeMode: string;

  async function scrollToTop(): Promise<void> {
    await SkyHostBrowser.scrollTo('body');
  }

  async function selectTheme(theme: string, mode: string): Promise<void> {
    currentTheme = theme;
    currentThemeMode = mode;

    await SkyVisualThemeSelector.selectTheme(theme, mode);
    await scrollToTop();
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

  beforeEach(async () => {
    await SkyHostBrowser.get('visual/fluid-grid');
  });

  async function validateXs(done: DoneFn): Promise<void> {
    await SkyHostBrowser.setWindowDimensions(600, 800);

    expect('#screenshot-fluid-grid-xsmall').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('fluid-grid-xs')
    });
  }

  async function validateEvenSplitSm(done: DoneFn): Promise<void> {
    await SkyHostBrowser.setWindowDimensions(800, 800);

    expect('#screenshot-fluid-grid').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('fluid-grid-sm-evenrow')
    });
  }

  async function validateTwoTopOneBottomMd(done: DoneFn): Promise<void> {
    await SkyHostBrowser.setWindowDimensions(1100, 800);

    expect('#screenshot-fluid-grid').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('fluid-grid-md-tworows')
    });
  }

  async function validateUnevenLg(done: DoneFn): Promise<void> {
    await SkyHostBrowser.setWindowDimensions(1400, 800);

    expect('#screenshot-fluid-grid').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('fluid-grid-lg-unevenrow')
    });
  }

  async function validateReverse(done: DoneFn): Promise<void> {
    await SkyHostBrowser.setWindowBreakpoint('lg');

    expect('#screenshot-fluid-grid-reverse').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('fluid-grid-reversecolumnorder')
    });
  }

  async function validateWrapperXs(done: DoneFn): Promise<void> {
    await SkyHostBrowser.setWindowDimensions(600, 800);

    expect('#screenshot-fluid-grid-wrapper-xsmall').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('fluid-grid-wrapper-xs')
    });
  }

  async function validateWrapperEvenSplitSm(done: DoneFn): Promise<void> {
    await SkyHostBrowser.setWindowDimensions(800, 800);

    expect('#screenshot-fluid-grid-wrapper').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('fluid-grid-wrapper-sm-evenrow')
    });
  }

  async function validateWrapperTwoTopOneBottomMd(done: DoneFn): Promise<void> {
    await SkyHostBrowser.setWindowDimensions(1100, 800);

    expect('#screenshot-fluid-grid-wrapper').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('fluid-grid-wrapper-md-tworows')
    });
  }

  async function validateWrapperUnevenLg(done: DoneFn): Promise<void> {
    await SkyHostBrowser.setWindowDimensions(1400, 800);

    expect('#screenshot-fluid-grid-wrapper').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('fluid-grid-wrapper-lg-unevenrow')
    });
  }

  async function validateWrapperReverse(done: DoneFn): Promise<void> {
    await SkyHostBrowser.setWindowBreakpoint('lg');

    expect('#screenshot-fluid-grid-wrapper-reverse').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('fluid-grid-wrapper-reversecolumnorder')
    });
  }

  async function validateRemoveMargins(done: DoneFn): Promise<void> {
    await element.all(by.css('#disableMargin')).click();

    expect('#screenshot-fluid-grid-gutters').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('screenshot-fluid-grid-remove-margins')
    });
  }

  async function validateGuttersMedium(done: DoneFn): Promise<void> {
    await element(by.cssContainingText('option', 'Medium')).click();

    expect('#screenshot-fluid-grid-gutters').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('screenshot-fluid-grid-gutters-medium')
    });
  }

  async function validateGuttersSmall(done: DoneFn): Promise<void> {
    await element(by.cssContainingText('option', 'Small')).click();

    expect('#screenshot-fluid-grid-gutters').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('screenshot-fluid-grid-gutters-small')
    });
  }

  it('should handle very small screens', async (done) => {
    await validateXs(done);
  });

  it('should display all columns evenly split on the same row when on a small screen', async (done) => {
    await validateEvenSplitSm(done);
  });

  it(
    'should display two on the top row and one on the bottom row when on a medium screen',
    async (done) => {
      await validateTwoTopOneBottomMd(done);
    }
  );

  it('should display all columns distributed unevenly when on a large screen', async (done) => {
    await validateUnevenLg(done);
  });

  it('should reverse column order with reverseColumnOrder applied', async (done) => {
    await validateReverse(done);
  });

  describe('with wrapping "sky-fluid-grid" component', () => {
    it('should handle very small screens', async (done) => {
      await validateWrapperXs(done);
    });

    it('should display all columns evenly split on the same row when on a small screen', async (done) => {
      await validateWrapperEvenSplitSm(done);
    });

    it(
      'should display two on the top row and one on the bottom row when on a medium screen',
      async (done) => {
        await validateWrapperTwoTopOneBottomMd(done);
      }
    );

    it('should display all columns distributed unevenly when on a large screen', async (done) => {
      await validateWrapperUnevenLg(done);
    });

    it('should reverse column order with reverseColumnOrder applied', async (done) => {
      await validateWrapperReverse(done);
    });

    describe('with adjustable gutters/margins', () => {
      beforeEach(async () => {
        await SkyHostBrowser.setWindowBreakpoint('lg');
        await SkyHostBrowser.scrollTo('#screenshot-fluid-grid-gutters');
      });

      it('should remove margins', async (done) => {
        await validateRemoveMargins(done);
      });

      it('should change gutters to medium', async (done) => {
        await validateGuttersMedium(done);
      });

      it('should change gutters to small', async (done) => {
        await validateGuttersSmall(done);
      });
    });
  });

  describe('when modern theme', () => {
    beforeEach(async () => {
      await selectTheme('modern', 'light');
    });

    it('should handle very small screens', async (done) => {
      await validateXs(done);
    });

    it('should display all columns evenly split on the same row when on a small screen', async (done) => {
      await validateEvenSplitSm(done);
    });

    it(
      'should display two on the top row and one on the bottom row when on a medium screen',
      async (done) => {
        await validateTwoTopOneBottomMd(done);
      }
    );

    it('should display all columns distributed unevenly when on a large screen', async (done) => {
      await validateUnevenLg(done);
    });

    it('should reverse column order with reverseColumnOrder applied', async (done) => {
      await validateReverse(done);
    });

    describe('with wrapping "sky-fluid-grid" component', () => {
      it('should handle very small screens', async (done) => {
        await validateWrapperXs(done);
      });

      it('should display all columns evenly split on the same row when on a small screen', async (done) => {
        await validateWrapperEvenSplitSm(done);
      });

      it(
        'should display two on the top row and one on the bottom row when on a medium screen',
        async (done) => {
          await validateWrapperTwoTopOneBottomMd(done);
        }
      );

      it('should display all columns distributed unevenly when on a large screen', async (done) => {
        await validateWrapperUnevenLg(done);
      });

      it('should reverse column order with reverseColumnOrder applied', async (done) => {
        await validateWrapperReverse(done);
      });

      describe('with adjustable gutters/margins', () => {
        beforeEach(async () => {
          await SkyHostBrowser.setWindowBreakpoint('lg');
          await SkyHostBrowser.scrollTo('#screenshot-fluid-grid-gutters');
        });

        it('should remove margins', async (done) => {
          await validateRemoveMargins(done);
        });

        it('should change gutters to medium', async (done) => {
          await validateGuttersMedium(done);
        });

        it('should change gutters to small', async (done) => {
          await validateGuttersSmall(done);
        });
      });
    });
  });

});

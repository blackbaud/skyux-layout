import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

describe('Fluid Grid', () => {
  beforeEach(() => {
    SkyHostBrowser.get('visual/fluid-grid');
  });

  it('should handle very small screens', (done) => {
    SkyHostBrowser.setWindowDimensions(600, 800);
    expect('#screenshot-fluid-grid-xsmall').toMatchBaselineScreenshot(done, {
      screenshotName: 'fluid-grid-xs'
    });
  });

  it('should display all columns evenly split on the same row when on a small screen', (done) => {
    SkyHostBrowser.setWindowDimensions(800, 800);
    expect('#screenshot-fluid-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'fluid-grid-sm-evenrow'
    });
  });

  it('should display two on the top row and one on the bottom row when on a medium screen', (done) => {
    SkyHostBrowser.setWindowDimensions(1100, 800);
    expect('#screenshot-fluid-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'fluid-grid-md-tworows'
    });
  });

  it('should display all columns distributed unevenly when on a large screen', (done) => {
    SkyHostBrowser.setWindowDimensions(1400, 800);
    expect('#screenshot-fluid-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'fluid-grid-lg-unevenrow'
    });
  });

  it('should reverse column order with reverseColumnOrder applied', (done) => {
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-fluid-grid-reverse').toMatchBaselineScreenshot(done, {
      screenshotName: 'fluid-grid-reversecolumnorder'
    });
  });
});

describe('Fluid Grid with wrapping "sky-fluid-grid" component', () => {
  beforeEach(() => {
    SkyHostBrowser.get('visual/fluid-grid');
  });

  it('should handle very small screens', (done) => {
    SkyHostBrowser.setWindowDimensions(600, 800);
    expect('#screenshot-fluid-grid-wrapper-xsmall').toMatchBaselineScreenshot(done, {
      screenshotName: 'fluid-grid-wrapper-xs'
    });
  });

  it('should display all columns evenly split on the same row when on a small screen', (done) => {
    SkyHostBrowser.setWindowDimensions(800, 800);
    expect('#screenshot-fluid-grid-wrapper').toMatchBaselineScreenshot(done, {
      screenshotName: 'fluid-grid-wrapper-sm-evenrow'
    });
  });

  it('should display two on the top row and one on the bottom row when on a medium screen', (done) => {
    SkyHostBrowser.setWindowDimensions(1100, 800);
    expect('#screenshot-fluid-grid-wrapper').toMatchBaselineScreenshot(done, {
      screenshotName: 'fluid-grid-wrapper-md-tworows'
    });
  });

  it('should display all columns distributed unevenly when on a large screen', (done) => {
    SkyHostBrowser.setWindowDimensions(1400, 800);
    expect('#screenshot-fluid-grid-wrapper').toMatchBaselineScreenshot(done, {
      screenshotName: 'fluid-grid-wrapper-lg-unevenrow'
    });
  });

  it('should reverse column order with reverseColumnOrder applied', (done) => {
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-fluid-grid-wrapper-reverse').toMatchBaselineScreenshot(done, {
      screenshotName: 'fluid-grid-wrapper-reversecolumnorder'
    });
  });

  describe('Fluid Grid with adjustable ', () => {
    beforeEach(() => {
      SkyHostBrowser.get('visual/fluid-grid');
    });

    it('should handle very small screens', (done) => {
      SkyHostBrowser.setWindowDimensions(600, 800);
      expect('#screenshot-fluid-grid-wrapper-xsmall').toMatchBaselineScreenshot(done, {
        screenshotName: 'fluid-grid-wrapper-xs'
      });
    });

    it('should display all columns evenly split on the same row when on a small screen', (done) => {
      SkyHostBrowser.setWindowDimensions(800, 800);
      expect('#screenshot-fluid-grid-wrapper').toMatchBaselineScreenshot(done, {
        screenshotName: 'fluid-grid-wrapper-sm-evenrow'
      });
    });

    it('should display two on the top row and one on the bottom row when on a medium screen', (done) => {
      SkyHostBrowser.setWindowDimensions(1100, 800);
      expect('#screenshot-fluid-grid-wrapper').toMatchBaselineScreenshot(done, {
        screenshotName: 'fluid-grid-wrapper-md-tworows'
      });
    });

    it('should display all columns distributed unevenly when on a large screen', (done) => {
      SkyHostBrowser.setWindowDimensions(1400, 800);
      expect('#screenshot-fluid-grid-wrapper').toMatchBaselineScreenshot(done, {
        screenshotName: 'fluid-grid-wrapper-lg-unevenrow'
      });
    });

    it('should reverse column order with reverseColumnOrder applied', (done) => {
      SkyHostBrowser.setWindowBreakpoint('lg');
      expect('#screenshot-fluid-grid-wrapper-reverse').toMatchBaselineScreenshot(done, {
        screenshotName: 'fluid-grid-wrapper-reversecolumnorder'
      });
    });
});

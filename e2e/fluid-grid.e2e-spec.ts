import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

describe('Fluid Grid', () => {
  it('should handle very small screens', (done) => {
    SkyHostBrowser.get('visual/fluid-grid');
    SkyHostBrowser.setWindowDimensions(600, 800);
    expect('#screenshot-fluid-grid-xsmall').toMatchBaselineScreenshot(done, {
      screenshotName: 'fluid-grid-xs'
    });
  });

  it('should display all columns evenly split on the same row when on a small screen', (done) => {
    SkyHostBrowser.get('visual/fluid-grid');
    SkyHostBrowser.setWindowDimensions(800, 800);
    expect('#screenshot-fluid-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'fluid-grid-sm-evenrow'
    });
  });

  it('should display two on the top row and one on the bottom row when on a medium screen', (done) => {
    SkyHostBrowser.get('visual/fluid-grid');
    SkyHostBrowser.setWindowDimensions(1100, 800);
    expect('#screenshot-fluid-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'fluid-grid-md-tworows'
    });
  });

  it('should display all columns distributed unevenly when on a large screen', (done) => {
    SkyHostBrowser.get('visual/fluid-grid');
    SkyHostBrowser.setWindowDimensions(1400, 800);
    expect('#screenshot-fluid-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'fluid-grid-lg-unevenrow'
    });
  });

  it('should reverse column order with reverseColumnOrder applied', (done) => {
    SkyHostBrowser.get('visual/fluid-grid');
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-fluid-grid-reverse').toMatchBaselineScreenshot(done, {
      screenshotName: 'fluid-grid-reversecolumnorder'
    });
  });
});

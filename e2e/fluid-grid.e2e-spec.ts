import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

import {
  by,
  element
} from 'protractor';

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

  describe('Fluid Grid with adjustable gutters/margins', () => {
    beforeEach(() => {
      SkyHostBrowser.get('visual/fluid-grid');
      SkyHostBrowser.setWindowBreakpoint('lg');
      SkyHostBrowser.scrollTo('#screenshot-fluid-grid-gutters');
    });

    it('should remove margins', (done) => {
      element.all(by.css('#disableMargin')).click();
      expect('#screenshot-fluid-grid-gutters').toMatchBaselineScreenshot(done, {
        screenshotName: 'screenshot-fluid-grid-remove-margins'
      });
    });

    it('should change gutters to medium', (done) => {
      element(by.cssContainingText('option', 'Medium')).click();
      expect('#screenshot-fluid-grid-gutters').toMatchBaselineScreenshot(done, {
        screenshotName: 'screenshot-fluid-grid-gutters-medium'
      });
    });

    it('should change gutters to small', (done) => {
      element(by.cssContainingText('option', 'Small')).click();
      expect('#screenshot-fluid-grid-gutters').toMatchBaselineScreenshot(done, {
        screenshotName: 'screenshot-fluid-grid-gutters-small'
      });
    });
  });
});

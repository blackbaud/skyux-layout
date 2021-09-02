import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';
import {
  SkyHostBrowserBreakpoint
} from '@skyux-sdk/e2e/host-browser/host-browser-breakpoint';
import {
  element,
  by
} from 'protractor';

describe('Page Summary', () => {
  async function clickTest(
    screenshotName: string, visibleComponents: Array<string>, done: DoneFn, breakPoint?: SkyHostBrowserBreakpoint) {
      await SkyHostBrowser.get('visual/page-summary');
      await SkyHostBrowser.setWindowBreakpoint(breakPoint ? breakPoint : 'lg');
      await element(by.css('#screenshots-page-summary-items'))
        .sendKeys(visibleComponents.join(','));
      expect('#screenshots-page-summary').toMatchBaselineScreenshot(done, {
        screenshotName: 'pagesummary-' + screenshotName
      });
  }

  it(
    'should match previous pagesummary screenshot when all components are present',
    async (done) => {
      return clickTest(
        'all',
        [
          'Title',
          'Subtitle',
          'Image',
          'Status',
          'KeyInfo',
          'Content',
          'Alert'
        ],
        done
      );
    }
  );

  it(
    'should match previous pagesummary screenshot when all components are present (screen: xs)',
    async (done) => {
      return clickTest(
        'all-xs',
        [
          'Title',
          'Subtitle',
          'Image',
          'Status',
          'KeyInfo',
          'Content',
          'Alert'
        ],
        done,
        'xs'
      );
    }
  );

  it(
    'should match previous pagesummary screenshot when no image is present',
    async (done) => {
      return clickTest(
        'noimage',
        [
          'Title',
          'Subtitle',
          'Status',
          'KeyInfo',
          'Content',
          'Alert'
        ],
        done
      );
    }
  );

  it(
    'should match previous pagesummary screenshot when no image is present (screen: xs)',
    async (done) => {
      return clickTest(
        'noimage-xs',
        [
          'Title',
          'Subtitle',
          'Status',
          'KeyInfo',
          'Content',
          'Alert'
        ],
        done,
        'xs'
      );
    }
  );

  it(
    'should match previous pagesummary screenshot when no subtitle is present',
    async (done) => {
      return clickTest(
        'nosubtitle',
        [
          'Title',
          'Image',
          'Status',
          'KeyInfo',
          'Content',
          'Alert'
        ],
        done
      );
    }
  );

  it(
    'should match previous pagesummary screenshot when no subtitle is present (screen: xs)',
    async (done) => {
      return clickTest(
        'nosubtitle-xs',
        [
          'Title',
          'Image',
          'Status',
          'KeyInfo',
          'Content',
          'Alert'
        ],
        done,
        'xs'
      );
    }
  );

  it(
    'should match previous pagesummary screenshot when no status is present',
    async (done) => {
      return clickTest(
        'nostatus',
        [
          'Title',
          'Subtitle',
          'Image',
          'KeyInfo',
          'Content',
          'Alert'
        ],
        done
      );
    }
  );

  it(
    'should match previous pagesummary screenshot when no status is present (screen: xs)',
    async (done) => {
      return clickTest(
        'nostatus-xs',
        [
          'Title',
          'Subtitle',
          'Image',
          'KeyInfo',
          'Content',
          'Alert'
        ],
        done,
        'xs'
      );
    }
  );

  it('should match previous pagesummary screenshot when no key info is present',
  async (done) => {
      return clickTest(
        'nokeyinfo',
        [
          'Title',
          'Subtitle',
          'Image',
          'Status',
          'Content',
          'Alert'
        ],
        done
      );
    }
  );

  it('should match previous pagesummary screenshot when no key info is present (screen: xs)',
  async (done) => {
      return clickTest(
        'nokeyinfo-xs',
        [
          'Title',
          'Subtitle',
          'Image',
          'Status',
          'Content',
          'Alert'
        ],
        done,
        'xs'
      );
    }
  );

  it(
    'should match previous pagesummary screenshot when no additional content is present',
    async (done) => {
      return clickTest(
        'nocontent',
        [
          'Title',
          'Subtitle',
          'Image',
          'Status',
          'KeyInfo',
          'Alert'
        ],
        done
      );
    }
  );

  it(
    'should match previous pagesummary screenshot when no additional content is present (screen: xs)',
    async (done) => {
      return clickTest(
        'nocontent-xs',
        [
          'Title',
          'Subtitle',
          'Image',
          'Status',
          'KeyInfo',
          'Alert'
        ],
        done,
        'xs'
      );
    }
  );

  it(
    'should match previous pagesummary screenshot when no alert is present',
    async (done) => {
      return clickTest(
        'noalert',
        [
          'Title',
          'Subtitle',
          'Image',
          'Status',
          'KeyInfo',
          'Content'
        ],
        done
      );
    }
  );

  it(
    'should match previous pagesummary screenshot when no alert is present (screen: xs)',
    async (done) => {
      return clickTest(
        'noalert-xs',
        [
          'Title',
          'Subtitle',
          'Image',
          'Status',
          'KeyInfo',
          'Content'
        ],
        done,
        'xs'
      );
    }
  );

  it(
    'should match previous pagesummary screenshot when only image, title, and subtitle are present',
    async (done) => {
      return clickTest(
        'image_title_subtitle',
        [
          'Title',
          'Subtitle',
          'Image'
        ],
        done
      );
    }
  );

  it(
    'should match previous pagesummary screenshot when only image, title, and subtitle are ' +
    'present (screen: xs)',
    async (done) => {
      return clickTest(
        'image_title_subtitle-xs',
        [
          'Title',
          'Subtitle',
          'Image'
        ],
        done,
        'xs'
      );
    }
  );
});

import { TestBed, async } from '@angular/core/testing';

import {
  expect
} from '@blackbaud/skyux-builder/runtime/testing/browser';

import { SkyMediaQueryService, SkyMediaBreakpoints } from '@skyux/core/modules/media-query';

import { MockSkyMediaQueryService } from '@skyux/core/testing';

import { SkyPageSummaryFixturesModule } from './fixtures/page-summary-fixtures.module';
import { SkyPageSummaryTestComponent } from './fixtures/page-summary.component.fixture';
import { SkyPageSummaryComponent } from './page-summary.component';

describe('Page summary component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyPageSummaryFixturesModule
      ]
    });
  });

  it('should move the key info section on extra-small screens', () => {
    function getSelector(size: string) {
      return `.sky-page-summary-key-info-${size} .sky-page-summary-key-info-container`;
    }

    let mockQueryService = new MockSkyMediaQueryService();

    let fixture = TestBed
      .overrideComponent(
        SkyPageSummaryComponent,
        {
          add: {
            providers: [
              {
                provide: SkyMediaQueryService,
                useValue: mockQueryService
              }
            ]
          }
        }
      )
      .createComponent(SkyPageSummaryTestComponent);

    fixture.detectChanges();

    let el = fixture.nativeElement;

    let xsSelector = getSelector('xs');
    let smSelector = getSelector('sm');

    expect(el.querySelector(xsSelector)).not.toExist();
    expect(el.querySelector(smSelector)).toExist();

    mockQueryService.fire(SkyMediaBreakpoints.xs);

    expect(el.querySelector(xsSelector)).toExist();
    expect(el.querySelector(smSelector)).not.toExist();
  });

  it('should be accessible', async(() => {
    let mockQueryService = new MockSkyMediaQueryService();

    let fixture = TestBed
      .overrideComponent(
        SkyPageSummaryComponent,
        {
          add: {
            providers: [
              {
                provide: SkyMediaQueryService,
                useValue: mockQueryService
              }
            ]
          }
        }
      )
      .createComponent(SkyPageSummaryTestComponent);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.nativeElement).toBeAccessible();
    });
  }));
});

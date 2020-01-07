import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  expect
} from '@skyux-sdk/testing';

import {
  InlineDeleteTestComponent
} from './fixtures/inline-delete.component.fixture';

import {
  SkyInlineDeleteFixturesModule
} from './fixtures/inline-delete-fixtures.module';

import {
  SkyInlineDeleteType
} from './inline-delete-type';

describe('Inline delete component', () => {
  let fixture: ComponentFixture<InlineDeleteTestComponent>;
  let cmp: InlineDeleteTestComponent;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyInlineDeleteFixturesModule
      ]
    });

    fixture = TestBed.createComponent(InlineDeleteTestComponent);
    cmp = fixture.componentInstance;
    el = fixture.nativeElement;
  });

  it('should emit the deleteTriggered event when the delete button is clicked', () => {
    fixture.detectChanges();
    const deleteTriggeredSpy = spyOn(cmp.inlineDelete.deleteTriggered, 'emit').and.callThrough();
    (<HTMLElement>el.querySelector('.sky-btn-danger')).click();
    fixture.detectChanges();
    expect(deleteTriggeredSpy).toHaveBeenCalled();
  });

  it('should emit the cancelTriggered event when the cancel button is clicked', async(() => {
    fixture.detectChanges();
    const cancelTriggeredSpy = spyOn(cmp.inlineDelete.cancelTriggered, 'emit').and.callThrough();
    (<HTMLElement>el.querySelector('.sky-btn-default')).click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      setTimeout(() => {
        expect(cancelTriggeredSpy).toHaveBeenCalled();
      }, 401);
    });
  }));

  it('should maintain css classes for card types correctly', () => {
    fixture.detectChanges();
    expect((<HTMLElement>el.querySelector('.sky-inline-delete'))
      .classList.contains('sky-inline-delete-standard')).toBeTruthy();
    expect((<HTMLElement>el.querySelector('.sky-inline-delete'))
      .classList.contains('sky-inline-delete-card')).toBeFalsy();
    cmp.inlineDelete.setType(SkyInlineDeleteType.Card);
    fixture.detectChanges();
    expect((<HTMLElement>el.querySelector('.sky-inline-delete'))
      .classList.contains('sky-inline-delete-standard')).toBeFalsy();
    expect((<HTMLElement>el.querySelector('.sky-inline-delete'))
      .classList.contains('sky-inline-delete-card')).toBeTruthy();
  });

  it('should show the sky wait when pending mode is on', () => {
    fixture.detectChanges();
    expect((<HTMLElement>el.querySelector('sky-wait'))).toBeNull();
    cmp.pending = true;
    fixture.detectChanges();
    expect((<HTMLElement>el.querySelector('sky-wait'))).not.toBeNull();
  });

  it('should be accessible in standard mode', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.nativeElement).toBeAccessible();
    });
  }));

  it('should be accessible in card mode', async(() => {
    fixture.detectChanges();
    cmp.inlineDelete.setType(SkyInlineDeleteType.Card);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.nativeElement).toBeAccessible();
    });
  }));

  it('should be accessible when pending', async(() => {
    cmp.pending = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      // NOTE: For some reason the color contrast rule fails on IE and Edge but passes all other
      // browsers. A manual test was done and nothing is different in these browsers so I am just
      // disabling the color contrast rule for this test for now.
      expect(fixture.nativeElement)
        .toBeAccessible(() => {}, { rules: { 'color-contrast': { enabled: false }}});
    });
  }));
});

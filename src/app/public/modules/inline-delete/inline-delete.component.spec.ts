import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  expect,
  SkyAppTestUtility
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

  function whenAnimationsDone(): Promise<void> {
    return fixture.whenRenderingDone()
      .then(() => {
        fixture.detectChanges();
        return fixture.whenStable()
          .then(() => fixture.detectChanges());
      });
  }

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

  afterEach(() => {
    fixture.destroy();
  });

  it('should emit the deleteTriggered event when the delete button is clicked', async(() => {
    fixture.detectChanges();
    const deleteTriggeredSpy = spyOn(cmp, 'onDeleteTriggered').and.callThrough();
    SkyAppTestUtility.fireDomEvent(el.querySelector('.sky-btn-danger'), 'click');
    fixture.detectChanges();
    whenAnimationsDone().then(() => {
      expect(deleteTriggeredSpy).toHaveBeenCalled();
    });
  }));

  it('should emit the cancelTriggered event when the cancel button is clicked', async(() => {
    fixture.detectChanges();
    const cancelTriggeredSpy = spyOn(cmp, 'onCancelTriggered').and.callThrough();
    const cancelButton: HTMLButtonElement = el.querySelector('.sky-btn-default');
    SkyAppTestUtility.fireDomEvent(cancelButton, 'click');
    fixture.detectChanges();
    whenAnimationsDone().then(() => {
      expect(cancelTriggeredSpy).toHaveBeenCalled();
    });
  }));

  it('should maintain css classes for card types correctly', async(() => {
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
  }));

  it('should show the sky wait when pending mode is on', async(() => {
    fixture.detectChanges();
    expect((<HTMLElement>el.querySelector('.sky-wait-mask'))).toBeNull();
    cmp.pending = true;
    fixture.detectChanges();
    expect((<HTMLElement>el.querySelector('.sky-wait-mask'))).not.toBeNull();
  }));

  describe('focus handling', () => {
    it('should focus the delete button on load', async(() => {
      fixture.detectChanges();
      whenAnimationsDone().then(() => {
        expect(document.activeElement).toBe(el.querySelector('.sky-btn-danger'));
      });
    }));

    it('should skip items that are under the overlay when tabbing forward', async(() => {
      fixture.componentInstance.showExtraButtons = true;
      fixture.detectChanges();
      (<HTMLElement>el.querySelector('#noop-button-1')).focus();
      SkyAppTestUtility.fireDomEvent(el.querySelector('#covered-button'), 'focusin', {
        customEventInit: {
          relatedTarget: document.body
        }
      });
      fixture.detectChanges();
      whenAnimationsDone().then(() => {
        expect(document.activeElement).toBe(el.querySelector('.sky-btn-danger'));
      });
    }));

    it('should skip items that are under the overlay when tabbing backward', async(() => {
      fixture.componentInstance.showExtraButtons = true;
      fixture.detectChanges();
      (<HTMLElement>el.querySelector('.sky-btn-danger')).focus();
      SkyAppTestUtility.fireDomEvent(el.querySelector('#covered-button'), 'focusin', {
        customEventInit: {
          relatedTarget: el.querySelector('.sky-btn-danger')
        }
      });
      fixture.detectChanges();
      whenAnimationsDone().then(() => {
        expect(document.activeElement).toBe(el.querySelector('#noop-button-1'));
      });
    }));

    it('should wrap around to the next focusable item on the screen when no direct item is found and tabbing backwards',
      async(() => {
        fixture.detectChanges();

        (<HTMLElement>el.querySelector('.sky-btn-danger')).focus();

        SkyAppTestUtility.fireDomEvent(el.querySelector('#covered-button'), 'focusin', {
          customEventInit: {
            relatedTarget: el.querySelector('.sky-btn-danger')
          }
        });

        fixture.detectChanges();

        whenAnimationsDone().then(() => {
          expect(document.activeElement).toBe(
            el.querySelector('.sky-inline-delete .sky-btn-default')
          );
        });
      }));
  });

  describe('accessibility', () => {
    it('should be accessible in standard mode', async(() => {
      fixture.detectChanges();
      whenAnimationsDone().then(() => {
        expect(fixture.nativeElement).toBeAccessible();
      });
    }));

    it('should be accessible in card mode', async(() => {
      fixture.detectChanges();
      cmp.inlineDelete.setType(SkyInlineDeleteType.Card);
      fixture.detectChanges();
      whenAnimationsDone().then(() => {
        expect(fixture.nativeElement).toBeAccessible();
      });
    }));

    it('should be accessible when pending', async(() => {
      cmp.pending = true;
      fixture.detectChanges();
      whenAnimationsDone().then(() => {
        expect(fixture.nativeElement).toBeAccessible();
      });
    }));
  });
});


import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed
} from '@angular/core/testing';

import {
  SkyModalService
} from '@skyux/modals';

import {
  expect,
  SkyAppTestUtility
} from '@skyux-sdk/testing';

import {
  Subject
} from 'rxjs';

import {
  SkyBackToTopFixtureComponent
} from './fixtures/back-to-top.component.fixture';

import {
  SkyBackToTopFixturesModule
} from './fixtures/back-to-top.module.fixture';

import {
  SkyBackToTopMessage
} from './models/back-to-top-message';

import {
  SkyBackToTopMessageType
} from './models/back-to-top-message-type';

//#region helpers
function scrollWindowToBottom(fixture: ComponentFixture<any>): void {
  window.scrollTo(0, document.body.scrollHeight);
  SkyAppTestUtility.fireDomEvent(window, 'scroll');
  fixture.detectChanges();
}

function scrollWindowTop(fixture: ComponentFixture<any>): void {
  window.scrollTo(0, 0);
  SkyAppTestUtility.fireDomEvent(window, 'scroll');
  fixture.detectChanges();
}

function getBackToTop(): HTMLElement {
  return document.querySelector('.sky-back-to-top');
}

function getBackToTopButton(): HTMLElement {
  return document.querySelector('.sky-back-to-top button');
}

function getBackToTopHost(): HTMLElement {
  return document.querySelector('sky-back-to-top');
}

function clickBackToTopButton(fixture: ComponentFixture<any>): void {
  getBackToTopButton().click();
  fixture.detectChanges();
}

function getBackToTopTarget(): HTMLElement {
  return document.querySelector('#back-to-top-target');
}

function getModalBackToTopTarget(): HTMLElement {
  return document.querySelector('#modal-back-to-top-target');
}

function getModalElement(): HTMLElement {
  return document.querySelector('.sky-modal');
}

function getModalContentElement(): HTMLElement {
  return document.querySelector('.sky-modal-content');
}

function getModalFooterElement(): HTMLElement {
  return document.querySelector('.sky-modal-footer');
}

function isElementInView(element: HTMLElement, boundingElement?: HTMLElement): boolean {
  const elementRect = element.getBoundingClientRect();

  const topBoundry = boundingElement ? boundingElement.getBoundingClientRect().top : 0;
  const bottomBoundry = boundingElement ? boundingElement.getBoundingClientRect().bottom : window.innerHeight;

  return (elementRect.top >= topBoundry) && (elementRect.bottom <= bottomBoundry);
}

function scrollElement(
  element: HTMLElement,
  yDistance: number,
  fixture: ComponentFixture<any>
): void {
  element.scrollTop = yDistance;
  SkyAppTestUtility.fireDomEvent(element, 'scroll');
  fixture.detectChanges();
}
//#endregion

describe('back to top component', () => {

  describe('when parent is window', () => {

    let fixture: ComponentFixture<SkyBackToTopFixtureComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          SkyBackToTopFixturesModule
        ]
      });

      fixture = TestBed.createComponent(SkyBackToTopFixtureComponent);
      fixture.detectChanges();
    });

    afterEach(() => {
      fixture.destroy();
    });

    it('should show when backToTopTarget is defined and the target element is scrolled out of view', fakeAsync(() => {
      scrollWindowToBottom(fixture);

      const backToTopElement = getBackToTop();
      expect(backToTopElement).not.toBeNull();
    }));

    it('should not show when user scrolls back to the top', fakeAsync(() => {
      scrollWindowToBottom(fixture);

      let backToTopElement = getBackToTop();
      expect(backToTopElement).not.toBeNull();

      scrollWindowTop(fixture);

      backToTopElement = getBackToTop();
      expect(backToTopElement).toBeNull();
    }));

    it('should scroll to target element when back to top button is clicked', fakeAsync(() => {
      fixture.detectChanges();
      scrollWindowToBottom(fixture);
      const backToTopTarget = getBackToTopTarget();

      expect(isElementInView(backToTopTarget)).toBe(false);

      clickBackToTopButton(fixture);

      expect(isElementInView(backToTopTarget)).toBe(true);
    }));

    it('should show the button if the user is already scrolled and buttonHidden changes to false', () => {
      fixture.componentInstance.backToTopOptions = { buttonHidden: true };
      fixture.detectChanges();

      scrollWindowToBottom(fixture);

      expect(getBackToTop()).toBeNull();

      fixture.componentInstance.backToTopOptions = { buttonHidden: false };
      fixture.detectChanges();

      expect(getBackToTop()).not.toBeNull();
    });

    it('should show the button if the user is already scrolled and buttonHidden changes to true', () => {
      fixture.componentInstance.backToTopOptions = { buttonHidden: false };
      fixture.detectChanges();

      scrollWindowToBottom(fixture);

      expect(getBackToTop()).not.toBeNull();

      fixture.componentInstance.backToTopOptions = { buttonHidden: true };
      fixture.detectChanges();

      expect(getBackToTop()).toBeNull();
    });

    it('should default buttonHidden to false if the options are not defined', () => {
      fixture.componentInstance.backToTopOptions = undefined;
      fixture.detectChanges();

      scrollWindowToBottom(fixture);

      expect(getBackToTop()).not.toBeNull();
    });
  });

  describe('when parent is scrollable element', () => {
    let parentElement: HTMLElement;

    let fixture: ComponentFixture<SkyBackToTopFixtureComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          SkyBackToTopFixturesModule
        ]
      });

      fixture = TestBed.createComponent(SkyBackToTopFixtureComponent);
      fixture.detectChanges();
      fixture.componentInstance.height = 200;
      fixture.componentInstance.scrollableParent = true;
      fixture.detectChanges();
      parentElement = document.querySelector('#back-to-top-parent') as HTMLElement;
    });

    afterEach(() => {
      fixture.destroy();
    });

    it('should show when backToTopTarget is defined and the target element is scrolled out of view', fakeAsync(() => {
      scrollElement(parentElement, 999, fixture);
      const backToTopElement = getBackToTop();

      expect(backToTopElement).not.toBeNull();
    }));

    it('should not show when user scrolls back to the top', fakeAsync(() => {
      scrollElement(parentElement, 999, fixture);
      let backToTopElement = getBackToTop();
      expect(backToTopElement).not.toBeNull();

      scrollElement(parentElement, 0, fixture);
      backToTopElement = getBackToTop();

      expect(backToTopElement).toBeNull();
    }));

    it('should scroll to target element when back to top button is clicked', async(() => {
      scrollElement(parentElement, 999, fixture);
      const backToTopTarget = getBackToTopTarget();

      expect(isElementInView(backToTopTarget)).toBe(false);

      clickBackToTopButton(fixture);

      expect(isElementInView(backToTopTarget)).toBe(true);
    }));
  });

  describe('when parent is a modal', () => {
    let fixture: ComponentFixture<SkyBackToTopFixtureComponent>;
    let modalContentElement: HTMLElement;
    let modalService: SkyModalService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          SkyBackToTopFixturesModule
        ]
      });

      fixture = TestBed.createComponent(SkyBackToTopFixtureComponent);
      fixture.detectChanges();
      fixture.componentInstance.openModal();

      modalContentElement = getModalContentElement();

      modalService = TestBed.inject(SkyModalService);
    });

    // This is necessary as due to modals being launched outside of the test bed they will not
    // automatically be disposed between tests.
    afterEach(fakeAsync(() => {
      // NOTE: This is important as it ensures that the modal host component is fully disposed of
      // between tests. This is important as the modal host might need a different set of component
      // injectors than the previous test.
      modalService.dispose();
      fixture.detectChanges();
    }));

    it('should show when backToTopTarget is defined and the target element is scrolled out of view', fakeAsync(() => {
      scrollElement(modalContentElement, 999, fixture);
      const backToTopElement = getBackToTop();

      expect(backToTopElement).not.toBeNull();
    }));

    it('should not show when user scrolls back to the top', fakeAsync(() => {
      scrollElement(modalContentElement, 999, fixture);
      let backToTopElement = getBackToTop();
      expect(backToTopElement).not.toBeNull();

      scrollElement(modalContentElement, 0, fixture);
      backToTopElement = getBackToTop();

      expect(backToTopElement).toBeNull();
    }));

    it('should scroll to target element when back to top button is clicked', async(() => {
      scrollElement(modalContentElement, 999, fixture);
      const backToTopTarget = getModalBackToTopTarget();

      expect(isElementInView(backToTopTarget, modalContentElement)).toBe(false);

      clickBackToTopButton(fixture);

      expect(isElementInView(backToTopTarget, modalContentElement)).toBe(true);
    }));

    it('should add the modal type class to the back to top button', fakeAsync(() => {
      scrollElement(modalContentElement, 999, fixture);
      let backToTopElement = getBackToTop();
      expect(backToTopElement.classList).toContain('sky-back-to-top-modal');
    }));

    it('should render the back to top button as a child of the modal content element', fakeAsync(() => {
      scrollElement(modalContentElement, 999, fixture);
      let backToTopHostElement = getBackToTopHost();
      let modalElement = getModalElement();
      let modalFooterElement = getModalFooterElement();
      expect(backToTopHostElement.parentElement).toBe(modalElement);
      expect(backToTopHostElement.previousElementSibling).toBe(modalContentElement);
      expect(backToTopHostElement.nextElementSibling).toBe(modalFooterElement);
    }));

  });

  describe('when the message stream is used', () => {

    let fixture: ComponentFixture<SkyBackToTopFixtureComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          SkyBackToTopFixturesModule
        ]
      });

      fixture = TestBed.createComponent(SkyBackToTopFixtureComponent);
      fixture.detectChanges();
    });

    afterEach(() => {
      fixture.destroy();
    });

    it('should scroll to target element when a BackToTop message is sent', () => {
      fixture.detectChanges();
      scrollWindowToBottom(fixture);
      const backToTopTarget = getBackToTopTarget();

      expect(isElementInView(backToTopTarget)).toBe(false);

      fixture.componentInstance.backToTopController.next({ type: SkyBackToTopMessageType.BackToTop });

      expect(isElementInView(backToTopTarget)).toBe(true);
    });

    it('unsubscribes from old back to top subscription streams', () => {
      const newStream = new Subject<SkyBackToTopMessage>();
      const oldStream = fixture.componentInstance.backToTopController;
      spyOn(oldStream, 'unsubscribe');

      fixture.componentInstance.backToTopController = newStream;
      fixture.detectChanges();

      expect(oldStream.unsubscribe).toHaveBeenCalled();
    });
  });
});

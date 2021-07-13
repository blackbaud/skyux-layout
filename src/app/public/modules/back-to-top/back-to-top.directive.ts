import {
  AfterViewInit,
  ComponentRef,
  Directive,
  ElementRef,
  Input,
  OnDestroy
} from '@angular/core';

import {
  SkyDockItem,
  SkyDockService
} from '@skyux/core';

import {
  Subject
} from 'rxjs';

import {
  takeUntil
} from 'rxjs/operators';

import {
  SkyBackToTopDomAdapterService
} from './back-to-top-adapter.service';

import {
  SkyBackToTopComponent
} from './back-to-top.component';

import {
  SkyBackToTopMessage
} from './models/back-to-top-message';

import {
  SkyBackToTopMessageType
} from './models/back-to-top-message-type';

import {
  SkyBackToTopOptions
} from './models/back-to-top-options';

import {
  SkyBackToTopType
} from './models/back-to-top-type';

/**
 * Associates a button with an element on the page and displays that button
 * to return to the element after users scroll away.
 */
@Directive({
  selector: '[skyBackToTop]',
  providers: [
    SkyBackToTopDomAdapterService
  ]
})
export class SkyBackToTopDirective implements AfterViewInit, OnDestroy {

  /**
   * Specifies configuration options for the back to top component.
   */
  @Input()
  public set skyBackToTop(value: SkyBackToTopOptions) {
    this.buttonHidden = !!value?.buttonHidden;

    this.handleBackToTopButton(this.elementInView);
  }

  /**
   * Provides an observable to send commands to the back to top component.
   * The commands respect the `SkyBackToTopMessage` type.
   */
  @Input()
  public set skyBackToTopMessageStream(value: Subject<SkyBackToTopMessage>) {
    if (this._skyBackToTopMessageStream) {
      this._skyBackToTopMessageStream.unsubscribe();
    }
    this._skyBackToTopMessageStream = value;
    this._skyBackToTopMessageStream
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((message: SkyBackToTopMessage) => this.handleIncomingMessages(message));
  }

  private buttonHidden = false;
  private elementInView: boolean;
  // NOTE: We are doing this union type here to make things a little cleaner in downstream code.
  // We have to render the component differenently depending on the location of the back to top
  // and this allows us to store it together.
  private renderedComponent: SkyDockItem<SkyBackToTopComponent> | ComponentRef<SkyBackToTopComponent>;
  private type: SkyBackToTopType;

  private ngUnsubscribe = new Subject<void>();
  private _skyBackToTopMessageStream: Subject<SkyBackToTopMessage>;

  constructor(
    private dockService: SkyDockService,
    private domAdapter: SkyBackToTopDomAdapterService,
    private element: ElementRef
  ) {}

  public ngAfterViewInit(): void {
    const scrollableParent = this.domAdapter.findScrollableParent(this.element.nativeElement);
    this.elementInView = this.domAdapter.isElementScrolledInView(this.element.nativeElement, scrollableParent);

    this.type = this.domAdapter.getBackToTopType(this.element);
    this.handleBackToTopButton(this.elementInView);
    this.setBackToTopListeners();
  }

  public ngOnDestroy(): void {
    if (this.renderedComponent) {
      this.destroyBackToTop();
    }
  }

  private handleBackToTopButton(elementInView: boolean): void {
    // Add back to top button if user scrolls down and button is not hidden.
    if (!this.renderedComponent && elementInView !== undefined && !elementInView && !this.buttonHidden) {
      this.addBackToTop();
    }
    // Remove back to top button if user scrolls back up.
    if (elementInView || this.buttonHidden) {
      this.destroyBackToTop();
    }
  }

  private addBackToTop(): void {
    let instance: SkyBackToTopComponent;

    if (this.type === 'page') {
      this.renderedComponent = this.dockService.insertComponent(SkyBackToTopComponent);
      instance = this.renderedComponent.componentInstance;
    } else {
      this.renderedComponent = this.domAdapter.createComponentWithinModal(this.element);
      instance = this.renderedComponent.instance;
    }

    instance.type = this.type;

    // Listen for clicks on the "back to top" button so we know when to scroll up.
    instance.scrollToTopClick
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.domAdapter.scrollToElement(this.element);
      });
  }

  private handleIncomingMessages(message: SkyBackToTopMessage): void {
    /* istanbul ignore else */
    if (message.type === SkyBackToTopMessageType.BackToTop) {
      this.domAdapter.scrollToElement(this.element);
    }
  }

  private setBackToTopListeners(): void {
    /* istanbul ignore else */
    if (this.element) {
      this.domAdapter.elementInViewOnScroll(this.element)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((elementInView: boolean) => {
          this.elementInView = elementInView;

          this.handleBackToTopButton(elementInView);
        });
    }
  }

  private destroyBackToTop(): void {
    /* istanbul ignore else */
    if (this.renderedComponent) {
      if (this.renderedComponent instanceof SkyDockItem) {
        this.renderedComponent.destroy();
      } else {
        this.domAdapter.destroyCompoennt(this.renderedComponent);
      }
      this.renderedComponent = undefined;
    }
  }
}

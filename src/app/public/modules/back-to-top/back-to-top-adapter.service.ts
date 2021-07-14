import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  OnDestroy,
  Renderer2,
  RendererFactory2
} from '@angular/core';

import {
  SkyAppWindowRef
} from '@skyux/core';

import {
  fromEvent,
  Observable,
  Subject
} from 'rxjs';

import {
  map,
  takeUntil
} from 'rxjs/operators';

import {
  SkyBackToTopComponent
} from './back-to-top.component';

import {
  SkyBackToTopType
} from './models/back-to-top-type';

/**
 * @internal
 */
@Injectable()
export class SkyBackToTopDomAdapterService implements OnDestroy {

  private ngUnsubscribe = new Subject<void>();
  private renderer: Renderer2;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector,
    private windowRef: SkyAppWindowRef,
    private rendererFactory: RendererFactory2
  ) {
    // Based on suggestions from https://github.com/angular/angular/issues/17824
    // for accessing an instance of Renderer2 in a service since Renderer2 can't
    // be injected into a service.  Passing undefined for both parameters results
    // in the default renderer which is what we want here.
    this.renderer = this.rendererFactory.createRenderer(undefined, undefined);
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public createComponentWithinModal(elementRef: ElementRef): ComponentRef<SkyBackToTopComponent> {
    const componentRef = this.componentFactoryResolver
    .resolveComponentFactory<SkyBackToTopComponent>(SkyBackToTopComponent)
    .create(this.injector);

    this.applicationRef.attachView(componentRef.hostView);

    const modal = this.findModalElement(elementRef.nativeElement);
    const modalFooter = modal.querySelector('.sky-modal-footer');
    this.renderer.insertBefore(modal, this.getRootNode(componentRef), modalFooter);

    return componentRef;
  }

  public destroyComponent(componentRef: ComponentRef<SkyBackToTopComponent>): void {
    /* istanbul ignore next */
    /* sanity check */
    if (!componentRef) {
      return;
    }

    this.applicationRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }

  /**
   * This event returns a boolean on scroll indicating whether the provided element is in view.
   * @param elementRef The target element reference.
   */
  public elementInViewOnScroll(elementRef: ElementRef): Observable<boolean> {
    const parent = this.findScrollableParent(elementRef.nativeElement);

    return fromEvent(parent, 'scroll')
      .pipe(
        takeUntil(this.ngUnsubscribe),
        map(() => {
          const isInView = this.isElementScrolledInView(
            elementRef.nativeElement,
            parent
          );
          return isInView;
        })
      );
  }

  public getBackToTopType(elementRef: ElementRef): SkyBackToTopType {
    let element = elementRef.nativeElement;
    if (this.findModalElement(element)) {
      return 'modal';
    }
    return 'page';
  }

  /**
   * Scrolls the window or scrollable parent to the provided element.
   * @param elementRef The target element reference.
   */
  public scrollToElement(elementRef: ElementRef): void {
    /* sanity check */
    /* istanbul ignore if */
    if (!elementRef || !elementRef.nativeElement) {
      return;
    }

    const windowObj = this.windowRef.nativeWindow;
    const parent = this.findScrollableParent(elementRef.nativeElement);

    if (parent === windowObj) {
      // Scroll to top of window, but account for the body margin that allows for the omnibar if it exists.
      const bodyMarginOffset = parseInt(getComputedStyle(document.body).marginTop, 10);
      const newOffsetTop = elementRef.nativeElement.offsetTop - bodyMarginOffset;
      this.windowRef.nativeWindow.scrollTo(
        elementRef.nativeElement.offsetLeft,
        newOffsetTop
      );
    } else {
      // Scroll to top of parent element.
      parent.scrollTop = parent.offsetTop - elementRef.nativeElement.offsetTop;
    }
  }

  public findModalElement(element: HTMLElement): any {
    do {
      if (element.classList.contains('sky-modal')) {
        return element;
      }
      element = element.parentElement;
      // tslint:disable-next-line:no-null-keyword
    } while (element !== null && element.nodeType === 1);
    return;
  }

  public findScrollableParent(element: any): any {
    const regex = /(auto|scroll)/;
    const windowObj = this.windowRef.nativeWindow;
    const bodyObj = windowObj.document.body;

    let style = windowObj.getComputedStyle(element);
    let parent = element;

    do {
      parent = parent.parentNode;
      style = windowObj.getComputedStyle(parent);
    } while (
      !regex.test(style.overflow) &&
      !regex.test(style.overflowY) &&
      parent !== bodyObj
    );

    if (parent === bodyObj) {
      return windowObj;
    }

    return parent;
  }

  public isElementScrolledInView(
    element: any,
    parentElement: any
  ): boolean {
    const buffer = 25;
    const windowObj = this.windowRef.nativeWindow;
    const elementRect = element.getBoundingClientRect();

    /* istanbul ignore else */
    if (parentElement === windowObj) {
      return (elementRect.top > -buffer);
    } else {
      const parentRect = parentElement.getBoundingClientRect();
      return (elementRect.top > parentRect.top - buffer);
    }
  }

  private getRootNode<T>(componentRef: ComponentRef<T>): any {
    // Technique for retrieving the component's root node taken from here:
    // https://malcoded.com/posts/angular-dynamic-components
    return (componentRef.hostView as EmbeddedViewRef<T>).rootNodes[0];
  }
}

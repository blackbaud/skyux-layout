import {
  ComponentRef,
  ElementRef,
  Injectable,
  Renderer2,
  RendererFactory2
} from '@angular/core';

import {
  MutationObserverService,
  SkyDynamicComponentService
} from '@skyux/core';

import {
  Observable
} from 'rxjs/Observable';

import {
  Subject
} from 'rxjs/Subject';

import 'rxjs/add/observable/fromEvent';

import 'rxjs/add/operator/debounceTime';

import {
  SkyDockComponent
} from './dock.component';

import {
  SkyDockItemConfig
} from './dock-item-config';

const ATTR_STACK_ORDER = 'data-sky-dock-stack-order';

/**
 * This service docks elements to specific areas on the page.
 */
@Injectable()
export class SkyDockService {

  private get bottomDockElement(): HTMLElement {
    return this.bottomDockRef.instance.elementRef.nativeElement as HTMLElement;
  }

  private bottomDockHeight: number;

  private bottomDockObserver: MutationObserver;

  private bottomDockRef: ComponentRef<SkyDockComponent>;

  private bottomDockStyleElement: HTMLStyleElement;

  private ngUnsubscribe: Subject<void>;

  private renderer: Renderer2;

  constructor(
    private mutationService: MutationObserverService,
    private dynamicComponentService: SkyDynamicComponentService,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(undefined, undefined);
  }

  /**
   * Docks an element to the bottom of the page.
   * @param elementRef The element to dock.
   * @param options Options that affect the docking action.
   */
  public dockToBottom(elementRef: ElementRef, options: SkyDockItemConfig = {}): void {
    if (!this.bottomDockRef) {
      this.createBottomDock();
      this.watchDomChanges();
    }

    if (isNaN(options.stackOrder)) {
      options.stackOrder = this.getHighestStackOrder() + 1;
    }

    const subjectElement = elementRef.nativeElement;
    const insertBeforeElement = this.findInsertSibling(options.stackOrder);
    const bottomDockElement = this.bottomDockElement;

    this.renderer.setAttribute(subjectElement, ATTR_STACK_ORDER, `${options.stackOrder}`);

    if (insertBeforeElement) {
      this.renderer.insertBefore(bottomDockElement, subjectElement, insertBeforeElement);
    } else {
      this.renderer.appendChild(bottomDockElement, subjectElement);
    }
  }

  /**
   * Removes an element reference from the bottom dock.
   * @param elementRef
   */
  public removeFromBottom(elementRef: ElementRef): void {
    /* istanbul ignore else */
    if (this.bottomDockRef) {
      this.renderer.removeChild(this.bottomDockElement, elementRef.nativeElement);
      if (this.bottomDockElement.children.length === 0) {
        this.destroyBottomDock();
      }
    }
  }

  private createBottomDock(): void {
    this.bottomDockRef = this.dynamicComponentService.createComponent(
      SkyDockComponent
    );
  }

  private destroyBottomDock(): void {
    this.bottomDockObserver.disconnect();
    this.ngUnsubscribe.next();

    if (this.bottomDockStyleElement) {
      this.destroyBottomStyleElement();
    }

    this.renderer.removeChild(document.body, this.bottomDockElement);

    this.bottomDockHeight =
    this.bottomDockObserver =
    this.bottomDockRef =
    this.bottomDockStyleElement =
    this.ngUnsubscribe = undefined;
  }

  private destroyBottomStyleElement(): void {
    this.renderer.removeChild(document.head, this.bottomDockStyleElement);
  }

  private adjustBottomMargin(): void {
    const dockHeight = this.bottomDockElement.getBoundingClientRect().height;
    if (dockHeight === this.bottomDockHeight) {
      return;
    }

    // Create a style element to avoid overwriting any existing inline body styles.
    const styleElement = this.renderer.createElement('style');
    const textNode = this.renderer.createText(`body { margin-bottom: ${dockHeight}px; }`);

    // Apply a `data-` attribute to make unit testing easier.
    this.renderer.setAttribute(
      styleElement,
      'data-test-selector',
      'sky-layout-dock-bottom-styles'
    );

    this.renderer.appendChild(styleElement, textNode);
    this.renderer.appendChild(document.head, styleElement);

    if (this.bottomDockStyleElement) {
      this.destroyBottomStyleElement();
    }

    this.bottomDockHeight = dockHeight;
    this.bottomDockStyleElement = styleElement;
  }

  private findInsertSibling(stackOrder: number): Element {
    const childElements = this.bottomDockElement.children;
    for (let i = 0, len = childElements.length; i < len; i++) {
      const childElement = childElements.item(i);
      const currentStackOrder = +childElement.getAttribute(ATTR_STACK_ORDER);
      if (!isNaN(currentStackOrder) && stackOrder >= currentStackOrder) {
        return childElement;
      }
    }
  }

  private getHighestStackOrder(): number {
    const childElements = this.bottomDockElement.children;
    const numChildElements = childElements.length;

    if (numChildElements === 0) {
      return 0;
    }

    let lastStackOrder = -Infinity;
    for (let i = 0; i < numChildElements; i++) {
      const currentStackOrder = +childElements.item(i).getAttribute(ATTR_STACK_ORDER);
      if (currentStackOrder > lastStackOrder) {
        lastStackOrder = currentStackOrder;
      }
    }

    return lastStackOrder;
  }

  private watchDomChanges(): void {
    this.bottomDockObserver = this.mutationService.create(() => {
      this.adjustBottomMargin();
    });

    this.bottomDockObserver.observe(this.bottomDockElement, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    });

    this.ngUnsubscribe = new Subject<void>();

    Observable.fromEvent(window, 'resize')
      .debounceTime(250)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(() => this.adjustBottomMargin());
  }

}

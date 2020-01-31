import {
  ElementRef,
  Injectable,
  ComponentRef,
  Renderer2,
  RendererFactory2
} from '@angular/core';

import {
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

const ATTR_STACK_ORDER = 'data-sky-dock-stack-order';

@Injectable()
export class SkyDockManagerService {

  private static bottomDockHeight: number;

  private static bottomDockObserver: MutationObserver;

  private static bottomDockRef: ComponentRef<SkyDockComponent>;

  private static bottomDockStyleElement: HTMLStyleElement;

  private static ngUnsubscribe = new Subject();

  private get bottomDockElement(): HTMLElement {
    return SkyDockManagerService.bottomDockRef.instance.elementRef.nativeElement as HTMLElement;
  }

  private renderer: Renderer2;

  constructor(
    private dynamicComponentService: SkyDynamicComponentService,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(undefined, undefined);
  }

  public dockToBottom(elementRef: ElementRef, stackOrder?: number): void {
    if (!SkyDockManagerService.bottomDockRef) {
      this.createBottomDock();
      this.watchDomChanges();
    }

    if (isNaN(stackOrder)) {
      stackOrder = this.getLargestStackOrder() + 1;
    }

    const subject = elementRef.nativeElement;
    const insertBeforeEl = this.findInsertSibling(stackOrder);

    if (insertBeforeEl) {
      this.renderer.insertBefore(this.bottomDockElement, subject, insertBeforeEl);
    } else {
      this.renderer.appendChild(this.bottomDockElement, subject);
    }

    console.log('Add to bottom:', this.bottomDockElement.getBoundingClientRect().height);
    this.renderer.setAttribute(subject, ATTR_STACK_ORDER, `${stackOrder}`);
  }

  public removeFromBottom(elRef: ElementRef): void {
    if (SkyDockManagerService.bottomDockRef) {
      this.renderer.removeChild(this.bottomDockElement, elRef.nativeElement);
      // Wait for the DOM to refresh before checking the children.
      setTimeout(() => {
        if (this.bottomDockElement.children.length === 0) {
          this.destroyBottomDock();
        }
      });
    }
  }

  private createBottomDock(): void {
    SkyDockManagerService.bottomDockRef = this.dynamicComponentService.createComponent(
      SkyDockComponent
    );
  }

  private destroyBottomDock(): void {
    SkyDockManagerService.bottomDockObserver.disconnect();
    SkyDockManagerService.ngUnsubscribe.next();

    if (SkyDockManagerService.bottomDockStyleElement) {
      this.destroyBottomStyleElement();
    }

    this.renderer.removeChild(document.body, this.bottomDockElement);

    SkyDockManagerService.bottomDockObserver =
    SkyDockManagerService.bottomDockStyleElement =
    SkyDockManagerService.bottomDockHeight =
    SkyDockManagerService.ngUnsubscribe = undefined;
  }

  private destroyBottomStyleElement(): void {
    this.renderer.removeChild(document.head, SkyDockManagerService.bottomDockStyleElement);
  }

  private adjustBottomMargin(): void {
    const dockHeight = this.bottomDockElement.getBoundingClientRect().height;
    if (dockHeight === SkyDockManagerService.bottomDockHeight) {
      return;
    }

    console.log('height?', dockHeight);

    // Create a style element to avoid overwriting any existing inline body styles.
    const styleElement = this.renderer.createElement('style');
    const textNode = this.renderer.createText(`body { margin-bottom: ${dockHeight}px; }`);
    this.renderer.appendChild(styleElement, textNode);
    this.renderer.appendChild(document.head, styleElement);

    if (SkyDockManagerService.bottomDockStyleElement) {
      this.destroyBottomStyleElement();
    }

    SkyDockManagerService.bottomDockHeight = dockHeight;
    SkyDockManagerService.bottomDockStyleElement = styleElement;
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

  private getLargestStackOrder(): number {
    const childElements = this.bottomDockElement.children;
    let lastStackOrder = -Infinity;
    for (let i = 0, len = childElements.length; i < len; i++) {
      const currentStackOrder = +childElements.item(i).getAttribute(ATTR_STACK_ORDER);
      if (currentStackOrder > lastStackOrder) {
        lastStackOrder = currentStackOrder;
      }
    }
    return lastStackOrder;
  }

  private watchDomChanges(): void {
    SkyDockManagerService.bottomDockObserver = new MutationObserver(() => {
      console.log('Observer fired.');
      this.adjustBottomMargin();
    });

    SkyDockManagerService.bottomDockObserver.observe(this.bottomDockElement, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    });

    Observable.fromEvent(window, 'resize')
      .debounceTime(250)
      .takeUntil(SkyDockManagerService.ngUnsubscribe)
      .subscribe(() => this.adjustBottomMargin());
  }

}

import {
  ComponentRef,
  ElementRef,
  Injectable,
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
export class SkyDockService {

  private static bottomDockHeight: number;

  private static bottomDockObserver: MutationObserver;

  private static bottomDockRef: ComponentRef<SkyDockComponent>;

  private static bottomDockStyleElement: HTMLStyleElement;

  private static ngUnsubscribe: Subject<void>;

  private get bottomDockElement(): HTMLElement {
    return SkyDockService.bottomDockRef.instance.elementRef.nativeElement as HTMLElement;
  }

  private renderer: Renderer2;

  constructor(
    private dynamicComponentService: SkyDynamicComponentService,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(undefined, undefined);
  }

  public dockToBottom(elementRef: ElementRef, stackOrder?: number): void {
    if (!SkyDockService.bottomDockRef) {
      this.createBottomDock();
      this.watchDomChanges();
    }

    if (isNaN(stackOrder)) {
      stackOrder = this.getHighestStackOrder() + 1;
    }

    const subjectElement = elementRef.nativeElement;
    const insertBeforeElement = this.findInsertSibling(stackOrder);
    const bottomDockElement = this.bottomDockElement;

    this.renderer.setAttribute(subjectElement, ATTR_STACK_ORDER, `${stackOrder}`);

    if (insertBeforeElement) {
      this.renderer.insertBefore(bottomDockElement, subjectElement, insertBeforeElement);
    } else {
      this.renderer.appendChild(bottomDockElement, subjectElement);
    }
  }

  public removeFromBottom(elRef: ElementRef): void {
    if (SkyDockService.bottomDockRef) {
      this.renderer.removeChild(this.bottomDockElement, elRef.nativeElement);
      if (this.bottomDockElement.children.length === 0) {
        this.destroyBottomDock();
      }
    }
  }

  private createBottomDock(): void {
    SkyDockService.bottomDockRef = this.dynamicComponentService.createComponent(
      SkyDockComponent
    );
  }

  private destroyBottomDock(): void {
    SkyDockService.bottomDockObserver.disconnect();
    SkyDockService.ngUnsubscribe.next();

    if (SkyDockService.bottomDockStyleElement) {
      this.destroyBottomStyleElement();
    }

    this.renderer.removeChild(document.body, this.bottomDockElement);

    SkyDockService.bottomDockHeight =
    SkyDockService.bottomDockObserver =
    SkyDockService.bottomDockRef =
    SkyDockService.bottomDockStyleElement =
    SkyDockService.ngUnsubscribe = undefined;
  }

  private destroyBottomStyleElement(): void {
    this.renderer.removeChild(document.head, SkyDockService.bottomDockStyleElement);
  }

  private adjustBottomMargin(): void {
    const dockHeight = this.bottomDockElement.getBoundingClientRect().height;
    if (dockHeight === SkyDockService.bottomDockHeight) {
      return;
    }

    // Create a style element to avoid overwriting any existing inline body styles.
    const styleElement = this.renderer.createElement('style');
    const textNode = this.renderer.createText(`body { margin-bottom: ${dockHeight}px; }`);
    this.renderer.appendChild(styleElement, textNode);
    this.renderer.appendChild(document.head, styleElement);

    if (SkyDockService.bottomDockStyleElement) {
      this.destroyBottomStyleElement();
    }

    SkyDockService.bottomDockHeight = dockHeight;
    SkyDockService.bottomDockStyleElement = styleElement;
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
    SkyDockService.bottomDockObserver = new MutationObserver(() => {
      // Wait a tick before calculating the dock's height.
      setTimeout(() => this.adjustBottomMargin(), 250);
    });

    SkyDockService.bottomDockObserver.observe(this.bottomDockElement, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    });

    SkyDockService.ngUnsubscribe = new Subject<void>();

    Observable.fromEvent(window, 'resize')
      .debounceTime(250)
      .takeUntil(SkyDockService.ngUnsubscribe)
      .subscribe(() => this.adjustBottomMargin());
  }

}

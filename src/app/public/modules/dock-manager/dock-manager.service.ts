import {
  ElementRef,
  Injectable
} from '@angular/core';

import {
  Observable
} from 'rxjs/Observable';

import {
  Subscription
} from 'rxjs/Subscription';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

const ATTR_Y_INDEX = 'data-sky-dockman-y-index';

@Injectable()
export class SkyDockManagerService {
  private bottomEl: HTMLDivElement;

  private bottomObserver: MutationObserver;

  private windowResizeSub: Subscription;

  private bottomStyleEl: HTMLStyleElement;

  private currentBottomElHeight: number;

  public dockToBottom(yIndex: number, elRef: ElementRef): void {
    if (!this.bottomEl) {
      this.createBottomEl();
    }

    let insertBeforeEl = this.findInsertSibling(yIndex);

    if (insertBeforeEl) {
      this.bottomEl.insertBefore(elRef.nativeElement, insertBeforeEl);
    } else {
      this.bottomEl.appendChild(elRef.nativeElement);
    }

    elRef.nativeElement.setAttribute(ATTR_Y_INDEX, yIndex);
  }

  public removeFromBottom(elRef: ElementRef): void {
    if (this.bottomEl) {
      this.bottomEl.removeChild(elRef.nativeElement);

      if (this.bottomEl.children.length === 0) {
        this.destroyBottomEl();
      }
    }
  }

  private createBottomEl(): void {
    const bottomEl = document.createElement('div');

    const bottomElStyle = bottomEl.style;
    bottomElStyle.position = 'fixed';
    bottomElStyle.bottom = '0';
    bottomElStyle.left = '0';
    bottomElStyle.right = '0';
    bottomElStyle.zIndex = '999';

    document.body.appendChild(bottomEl);

    this.bottomEl = bottomEl;

    this.bottomObserver = new MutationObserver(() => this.adjustBottomMargin());

    this.bottomObserver.observe(this.bottomEl, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    });

    this.windowResizeSub = Observable.fromEvent(window, 'resize')
      .debounceTime(250)
      .subscribe(() => this.adjustBottomMargin());
  }

  private adjustBottomMargin(): void {
    const bottomElHeight = this.bottomEl.getBoundingClientRect().height;

    if (bottomElHeight !== this.currentBottomElHeight) {
      this.currentBottomElHeight = bottomElHeight;

      const styleEl = document.createElement('style');
      styleEl.appendChild(document.createTextNode(`
  body {
    margin-bottom: ${bottomElHeight}px;
  }
      `));

      document.head.appendChild(styleEl);

      if (this.bottomStyleEl) {
        document.head.removeChild(this.bottomStyleEl);
      }

      this.bottomStyleEl = styleEl;
    }
  }

  private destroyBottomEl(): void {
    this.bottomObserver.disconnect();
    this.windowResizeSub.unsubscribe();

    if (this.bottomStyleEl) {
      document.head.removeChild(this.bottomStyleEl);
    }

    document.body.removeChild(this.bottomEl);

    this.bottomEl =
      this.bottomStyleEl =
      this.bottomObserver =
      this.currentBottomElHeight =
      this.windowResizeSub =
      undefined;
  }

  private findInsertSibling(yIndex: number): Element {
    const childEls = this.bottomEl.children;
    let previousYIndex = -Infinity;

    for (let i = 0, n = childEls.length; i < n; i++) {
      const childEl = childEls.item(i);
      const currentYIndex = +childEl.getAttribute(ATTR_Y_INDEX);

      if (!isNaN(currentYIndex) && currentYIndex > yIndex && previousYIndex <= yIndex) {
        return childEl;
      }

      previousYIndex = currentYIndex;
    }
  }

}

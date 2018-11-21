import {
  Injectable,
  Renderer2,
  RendererFactory2
} from '@angular/core';

import {
  Observable
} from 'rxjs/Observable';

import {
  Subscription
} from 'rxjs/Subscription';

import 'rxjs/add/observable/fromEvent';

import {
  SkyWindowRefService
} from '@skyux/core';
import { SkySummaryActionbarType } from './types';

@Injectable()
export class SkySummaryActionbarAdapterService {

  private renderer: Renderer2;

  private resizeSubscription: Subscription;

  constructor(
    private rendererFactory: RendererFactory2,
    private windowRef: SkyWindowRefService
  ) {
    this.renderer = this.rendererFactory.createRenderer(undefined, undefined);
  }

  public adjustForActionbar(destroying?: boolean): void {
    const window = this.windowRef.getWindow();
    const body = window.document.body;
    if (destroying) {
      this.renderer.setStyle(body, 'margin-bottom', '');
    } else {
      const actionbarEl = <HTMLElement>window.document.getElementsByClassName('sky-summary-actionbar').item(0);
      this.renderer.setStyle(body, 'margin-bottom', actionbarEl.offsetHeight + 'px');
    }
  }

  public setupResizeListener(): void {
    const windowObj = this.windowRef.getWindow();
    this.resizeSubscription = Observable
      .fromEvent(windowObj, 'resize')
      .subscribe(() => {
        this.adjustForActionbar();
      });
  }

  public removeResizeListener(): void {
    this.resizeSubscription.unsubscribe();
  }

  public getSummaryActionbarType(el: Element): SkySummaryActionbarType {
    do {
      if (el.tagName.toLowerCase() === 'sky-modal-footer') {
        while (el.tagName.toLowerCase() !== 'sky-modal') {
          if (el.classList.contains('sky-modal-full-page')) {
            return SkySummaryActionbarType.FullPageModal;
          }
          el = el.parentElement;
        }
        return SkySummaryActionbarType.StandardModal;
      }
      el = el.parentElement;
      // tslint:disable-next-line:no-null-keyword
    } while (el !== null && el.nodeType === 1);
    return SkySummaryActionbarType.Page;
  }

  public addModalFooterClass(): void {
    const window = this.windowRef.getWindow();
    const modalFooterEl = <HTMLElement>window.document.getElementsByClassName('sky-modal-footer-container')[0];
    this.renderer.setStyle(modalFooterEl, 'padding', 0);
  }
}

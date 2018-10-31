import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { SkyWindowRefService } from '@skyux/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

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

  public adjustForActionbar(destroying?: boolean) {
    const window = this.windowRef.getWindow();
    const body = window.document.body;
    if (destroying) {
      this.renderer.setStyle(body, 'margin-bottom', '');
    } else {
      const actionbarEl = <HTMLElement>window.document.getElementsByClassName('sky-summary-actionbar').item(0);
      this.renderer.setStyle(body, 'margin-bottom', actionbarEl.offsetHeight + 'px');
    }
  }

  public setupResizeListener() {
    const windowObj = this.windowRef.getWindow();
    this.resizeSubscription = Observable
      .fromEvent(windowObj, 'resize')
      .subscribe(() => {
        this.adjustForActionbar();
      });
  }

  public removeResizeListener() {
    this.resizeSubscription.unsubscribe();
  }

  public isInModalFooter(el: Element) {
    do {
      if (el.tagName.toLowerCase() === 'sky-modal-footer') {
        while (el.tagName.toLowerCase() !== 'sky-modal') {
          if (el.classList.contains('sky-modal-full-page')) {
            return 'full';
          }
          el = el.parentElement;
        }
        return 'standard';
      }
      el = el.parentElement;
      // tslint:disable-next-line:no-null-keyword
    } while (el !== null && el.nodeType === 1);
    return '';
  }

  public addModalFooterClass() {
    const window = this.windowRef.getWindow();
    const modalFooterEl = <HTMLElement>window.document.getElementsByClassName('sky-modal-footer-container')[0];
    this.renderer.setStyle(modalFooterEl, 'padding', 0);
  }
}

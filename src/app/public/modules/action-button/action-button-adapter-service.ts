import {
  ElementRef,
  Injectable,
  Renderer2,
  RendererFactory2
} from '@angular/core';

/**
 * @internal
 */
@Injectable()
export class SkyActionButtonAdapterService {

  private renderer: Renderer2;

  constructor(
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(undefined, undefined);
  }

  public getParentWidth(element: ElementRef): number {
    return element.nativeElement.parentNode.getBoundingClientRect().width;
  }

  public setResponsiveClass(element: ElementRef, width: number): void {
    const el: any = element.nativeElement;
    const className = this.getResponsiveClassName(width);

    this.renderer.removeClass(el, 'sky-action-button-container-sm');
    this.renderer.removeClass(el, 'sky-action-button-container-md');
    this.renderer.removeClass(el, 'sky-action-button-container-lg');

    this.renderer.addClass(el, className);
  }

  private getResponsiveClassName(width: number): string {
    const smBreakpointMinPixels = 477;
    const smBreakpointMaxPixels = 937;
    const mdBreakpointMinPixels = 938;
    const mdBreakpointMaxPixels = 1398;

    if (width >= smBreakpointMinPixels && width <= smBreakpointMaxPixels) {
      return 'sky-action-button-container-sm';
    } else if (width >= mdBreakpointMinPixels && width <= mdBreakpointMaxPixels) {
      return 'sky-action-button-container-md';
    } else {
      return 'sky-action-button-container-lg';
    }
  }

}

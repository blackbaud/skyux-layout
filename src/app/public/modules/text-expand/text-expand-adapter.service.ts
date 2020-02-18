import {
  ElementRef,
  Injectable,
  Renderer2,
  RendererFactory2
} from '@angular/core';

@Injectable()
export class SkyTextExpandAdapterService {

  private renderer: Renderer2;

  constructor(
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(undefined, undefined);
  }

  public getContainerHeight(containerEl: ElementRef): number {
    return containerEl.nativeElement.getBoundingClientRect().height;
  }

  public setContainerHeight(containerEl: ElementRef, height: string): void {
    if (height === undefined) {
      this.renderer.removeStyle(containerEl.nativeElement, 'max-height');
      this.renderer.removeStyle(containerEl.nativeElement, 'overflow');
    } else {
      this.renderer.setStyle(containerEl.nativeElement, 'max-height', height);
      this.renderer.setStyle(containerEl.nativeElement, 'overflow', 'hidden');
    }
  }

  public setText(textEl: ElementRef, text: string) {
    textEl.nativeElement.textContent = text;
  }
}

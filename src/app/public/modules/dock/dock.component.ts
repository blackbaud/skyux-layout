import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Injector,
  Type,
  ViewChild,
  ViewContainerRef,
  ViewRef
} from '@angular/core';

import {
  SkyDockDomAdapterService
} from './dock-dom-adapter.service';

import {
  SkyDockItemConfig
} from './dock-item-config';

/**
 * @internal
 */
@Component({
  selector: 'sky-dock',
  templateUrl: './dock.component.html',
  styleUrls: ['./dock.component.scss'],
  providers: [
    SkyDockDomAdapterService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDockComponent implements AfterViewInit {

  /**
   * Use `any` for backwards-compatibility with Angular 4-7.
   * See: https://github.com/angular/angular/issues/30654
   * TODO: Remove the `any` in a breaking change.
   * @internal
   */
  @ViewChild('target', {
    read: ViewContainerRef,
    static: true
  } as any)
  private target: ViewContainerRef;

  private items: {
    viewRef: ViewRef;
    stackOrder: number;
  }[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private resolver: ComponentFactoryResolver,
    private elementRef: ElementRef,
    private injector: Injector,
    private domAdapter: SkyDockDomAdapterService
  ) { }

  public ngAfterViewInit(): void {
    this.domAdapter.watchDomChanges(this.elementRef);
  }

  public append<T>(component: Type<T>, config: SkyDockItemConfig): ComponentRef<T> {
    const factory = this.resolver.resolveComponentFactory(component);

    const injector = Injector.create({
      providers: config.providers || [],
      parent: this.injector
    });

    const componentRef = this.target.createComponent(factory, undefined, injector);

    this.items.push({
      viewRef: componentRef.hostView,
      stackOrder: config.stackOrder || this.getHighestStackOrder()
    });

    setTimeout(() => {
      this.sortItemsByStackOrder();
      this.changeDetector.markForCheck();
    });

    return componentRef;
  }

  public removeItem(viewRef: ViewRef): void {
    this.target.remove(this.target.indexOf(viewRef));
    const item = this.items.find(i => i.viewRef === viewRef);
    this.items.splice(this.items.indexOf(item), 1);
  }

  private sortItemsByStackOrder(): void {
    this.items.sort((a, b) => {
      if (a.stackOrder > b.stackOrder) {
        return -1;
      }

      if (a.stackOrder < b.stackOrder) {
        return 1;
      }

      return 0;
    });

    // Detach all views so we can assign new indexes without overwriting their placement.
    for (let i = 0, len = this.target.length; i < len; i++) {
      this.target.detach(i);
    }

    // Reassign the correct index for each view.
    this.items.forEach((item, i) => this.target.insert(item.viewRef, i));
  }

  private getHighestStackOrder(): number {
    if (this.items.length === 0) {
      return 0;
    }

    return this.items[0].stackOrder + 1;
  }

}

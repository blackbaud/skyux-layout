import {
  ComponentRef,
  Injectable,
  Type
} from '@angular/core';

import {
  SkyDynamicComponentService
} from '@skyux/core';

import {
  SkyDockItem
} from './dock-item';

import {
  SkyDockComponent
} from './dock.component';

import {
  SkyDockItemConfig
} from './dock-item-config';

/**
 * This service docks components to specific areas on the page.
 */
@Injectable()
export class SkyDockService {

  private dockRef: ComponentRef<SkyDockComponent>;

  constructor(
    private dynamicComponentService: SkyDynamicComponentService
  ) { }

  /**
   * Docks a component to the bottom of the page.
   * @param component The component to dock.
   * @param config Options that affect the docking action.
   */
  public addToDock<T>(component: Type<T>, config: SkyDockItemConfig = {}): SkyDockItem<T> {
    if (!this.dockRef) {
      this.createBottomDock();
    }

    const componentRef = this.dockRef.instance.append(component, config);
    const item = new SkyDockItem(componentRef.instance);

    item.destroyed.subscribe(() => {
      this.dockRef.instance.removeItem(componentRef.hostView);
    });

    return item;
  }

  private createBottomDock(): void {
    this.dockRef = this.dynamicComponentService.createComponent(SkyDockComponent);
  }

}

import {
  Component,
  QueryList,
  ViewChildren
} from '@angular/core';

import {
  SkyDockItemConfig
} from '../dock-item-config';

import {
  DockItemFixtureComponent
} from './dock-item.component.fixture';

@Component({
  selector: 'dock-test',
  templateUrl: './dock.component.fixture.html'
})
export class DockFixtureComponent {

  public dockItems: {
    dockingOptions?: SkyDockItemConfig;
    height?: number;
  }[];

  @ViewChildren(DockItemFixtureComponent)
  private itemComponents: QueryList<DockItemFixtureComponent>;

  public removeAllItems(): void {
    if (this.itemComponents) {
      this.itemComponents.forEach((item) => {
        item.remove();
      });
    }
  }

}

import {
  AfterViewInit,
  Component
} from '@angular/core';

import {
  SkyDockService
} from '../../public';

import {
  DockItemVisualContext
} from './dock-item-context';

import {
  DockItemVisualComponent
} from './dock-item-visual.component';

@Component({
  selector: 'dock-visual',
  templateUrl: './dock-visual.component.html',
  styleUrls: ['./dock-visual.component.scss']
})
export class DockVisualComponent implements AfterViewInit {

  public stackOrder: number;

  private configs: any[] = [
    {
      stackOrder: 0,
      backgroundColor: 'darkred'
    },
    {
      stackOrder: 100,
      backgroundColor: 'darkmagenta'
    },
    {
      stackOrder: 10,
      backgroundColor: 'darkcyan'
    },
    {
      stackOrder: -1000,
      backgroundColor: 'darkblue'
    },
    {
      stackOrder: 1,
      backgroundColor: 'darkgreen'
    }
  ];

  constructor(
    private dockService: SkyDockService
  ) { }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.configs.forEach((config) => {
        this.addToDock(config);
      });
    });
  }

  public addItem(): void {
    let stackOrder = this.stackOrder;
    if (stackOrder === undefined) {
      const highestItem = document.querySelector('.dock-item-stack-order');
      if (highestItem) {
        stackOrder = +highestItem.textContent + 1;
      } else {
        stackOrder = 0;
      }
    }

    this.addToDock({
      backgroundColor: 'tan',
      stackOrder
    });
  }

  private addToDock(config: any): void {
    const item = this.dockService.addToDock(DockItemVisualComponent, {
      stackOrder: config.stackOrder,
      providers: [
        {
          provide: DockItemVisualContext,
          useValue: new DockItemVisualContext(
            config.backgroundColor,
            config.stackOrder
          )
        }
      ]
    });

    item.componentInstance.stackOrder = item.stackOrder;

    item.destroyed.subscribe(() => {
      console.log('Dock item destroyed:', item.stackOrder);
    });

    item.componentInstance.closeClicked.subscribe(() => item.destroy());
  }
}

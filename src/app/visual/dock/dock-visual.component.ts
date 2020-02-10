import {
  Component,
  OnInit
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
export class DockVisualComponent implements OnInit {

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

  public ngOnInit(): void {
    this.configs.forEach((config) => this.addToDock(config));
  }

  public addItem(): void {
    this.addToDock({
      backgroundColor: 'tan',
      stackOrder: this.stackOrder
    });
  }

  private addToDock(config: any): void {

    // if (this.settings.stackOrder === undefined) {
    //   this.settings.stackOrder = +document.querySelector('.dock-item-stack-order').textContent + 1;
    // }

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

    item.destroyed.subscribe(() => {
      console.log('Dock item destroyed:', item.componentInstance.uniqueId);
    });

    item.componentInstance.closeClicked.subscribe(() => item.destroy());
  }
}

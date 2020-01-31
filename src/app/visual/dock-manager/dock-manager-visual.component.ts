import {
  Component,
  OnInit
} from '@angular/core';

import {
  SkyDockManagerService
} from '../../public';

@Component({
  selector: 'dock-manager-visual',
  templateUrl: './dock-manager-visual.component.html'
})
export class DockManagerVisualComponent implements OnInit {

  public clickCount = 0;

  // public comps: any[] = [
  //   {
  //     stackOrder: 100,
  //     backgroundColor: 'red'
  //   },
  //   {
  //     stackOrder: 200,
  //     backgroundColor: 'blue'
  //   },
  //   {
  //     stackOrder: 10,
  //     backgroundColor: 'green'
  //   },
  //   {
  //     stackOrder: 1000,
  //     backgroundColor: 'yellow'
  //   },
  //   {
  //     stackOrder: 1001,
  //     backgroundColor: 'yellow'
  //   },
  //   {
  //     stackOrder: 1,
  //     backgroundColor: 'yellow'
  //   },
  //   {
  //     stackOrder: -1000,
  //     backgroundColor: 'yellow'
  //   }
  // ];

  public comps: any[] = [
    {
      stackOrder: 100,
      backgroundColor: 'red'
    }
  ];

  constructor(
    public dockManager: SkyDockManagerService
  ) { }

  public ngOnInit(): void { }

  public updateClickCount() {
    this.clickCount++;
  }

  public addItem(): void {
    this.comps.push({
      backgroundColor: 'black'
    });
  }
}

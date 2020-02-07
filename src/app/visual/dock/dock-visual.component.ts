import {
  Component
} from '@angular/core';

@Component({
  selector: 'dock-visual',
  templateUrl: './dock-visual.component.html',
  styleUrls: ['./dock-visual.component.scss']
})
export class DockVisualComponent {

  public stackOrder: number;

  public comps: any[] = [
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

  public addItem(): void {
    this.comps.push({
      backgroundColor: 'tan',
      stackOrder: this.stackOrder
    });

    this.stackOrder = undefined;
  }
}

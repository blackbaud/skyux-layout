import {
  Component
} from '@angular/core';

@Component({
  selector: 'dock-visual',
  templateUrl: './dock-visual.component.html'
})
export class DockVisualComponent {

  public comps: any[] = [
    {
      stackOrder: 100,
      borderColor: 'red'
    },
    {
      stackOrder: 200,
      borderColor: 'blue'
    },
    {
      stackOrder: 10,
      borderColor: 'green'
    },
    {
      stackOrder: 1000,
      borderColor: 'cyan'
    },
    {
      stackOrder: 1001,
      borderColor: 'darkred'
    },
    {
      stackOrder: 1,
      borderColor: 'darkblue'
    },
    {
      stackOrder: -1000,
      borderColor: 'darkgreen'
    }
  ];

  public addItem(): void {
    this.comps.push({
      borderColor: 'tan'
    });
  }
}

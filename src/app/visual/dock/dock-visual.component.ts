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
      stackOrder: 0,
      borderColor: 'red'
    },
    {
      stackOrder: 100,
      borderColor: 'green'
    },
    {
      stackOrder: 10,
      borderColor: 'cyan'
    },
    {
      stackOrder: -1000,
      borderColor: 'darkblue'
    },
    {
      stackOrder: 1,
      borderColor: 'darkgreen'
    }
  ];

  public addItem(): void {
    this.comps.push({
      borderColor: 'tan'
    });
  }
}

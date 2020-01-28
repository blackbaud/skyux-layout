import {
  Component
} from '@angular/core';

@Component({
  selector: 'dock-manager-visual',
  styleUrls: ['./dock-manager-visual.component.scss'],
  templateUrl: './dock-manager-visual.component.html'
})
export class DockManagerVisualComponent {

  public clickCount = 0;

  public comps: any[] = [
    {
      yIndex: 100,
      backgroundColor: 'red'
    },
    {
      yIndex: 200,
      backgroundColor: 'blue'
    },
    {
      yIndex: 10,
      backgroundColor: 'green'
    },

    {
      yIndex: 1000,
      backgroundColor: 'yellow'
    }
  ];

  public updateClickCount() {
    this.clickCount++;
  }
}

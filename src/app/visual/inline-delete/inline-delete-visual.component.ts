import {
  Component
} from '@angular/core';

@Component({
  selector: 'inline-delete-visual',
  templateUrl: './inline-delete-visual.component.html',
  styles: [`
    #screenshot-inline-delete{
      padding: 15px;
      background-color: white;
      width: max-content;
      position: relative;
    }
  `]
})
export class InlineDeleteVisualComponent {

  public deleting: boolean = false;
  public pending: boolean = false;

}

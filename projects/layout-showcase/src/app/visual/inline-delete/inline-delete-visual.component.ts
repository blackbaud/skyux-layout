import {
  Component
} from '@angular/core';

import {
  SkyAppConfig
} from '@skyux/config';

@Component({
  selector: 'app-inline-delete-visual',
  templateUrl: './inline-delete-visual.component.html',
  styles: [`
    #screenshot-inline-delete{
      padding: 15px;
      background-color: white;
      height: 400px;
      width: 400px;
      position: relative;
    }
  `]
})
export class InlineDeleteVisualComponent {

  public deleting: boolean = false;
  public pending: boolean = false;

  public onCancelTriggered(): void {
    this.deleting = false;
  }

  public onDeleteTriggered(): void {
    this.deleting = false;
  }

  public onShowInlineDeleteClick(): void {
    this.deleting = true;
  }

}

import {
  Component,
  Optional,
  OnInit
} from '@angular/core';

import {
  Subject
} from 'rxjs';

import {
  DockItemVisualContext
} from './dock-item-context';

let uniqueId = 0;

@Component({
  selector: 'dock-item-visual',
  styleUrls: ['./dock-item-visual.component.scss'],
  templateUrl: './dock-item-visual.component.html'
})
export class DockItemVisualComponent implements OnInit {

  public closeClicked = new Subject<void>();

  public height = 'auto';

  public uniqueId: number;

  constructor(
    @Optional() public context: DockItemVisualContext
  ) {
    this.uniqueId = ++uniqueId;
  }

  public ngOnInit(): void {
  }

  public setHeight(): void {
    this.height = '150px';
  }

  public onCloseClick(): void {
    this.closeClicked.next();
    this.closeClicked.complete();
  }
}

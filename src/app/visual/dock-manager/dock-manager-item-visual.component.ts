import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy
} from '@angular/core';

import {
  SkyDockManagerService
} from '../../public/modules/dock-manager/dock-manager.service';

@Component({
  selector: 'dock-manager-item-visual',
  styleUrls: ['./dock-manager-item-visual.component.scss'],
  templateUrl: './dock-manager-item-visual.component.html'
})
export class DockManagerItemVisualComponent implements AfterViewInit, OnDestroy {

  @Input()
  public yIndex: number;

  @Input()
  public backgroundColor: string;

  public text = 'Hello.';

  constructor(
    private elRef: ElementRef,
    private dockManager: SkyDockManagerService
  ) { }

  public setText() {
    this.text = 'Yo';
  }

  public ngAfterViewInit() {
    this.dockManager.dockToBottom(this.yIndex, this.elRef);
  }

  public ngOnDestroy() {
    this.dockManager.removeFromBottom(this.elRef);
  }
}

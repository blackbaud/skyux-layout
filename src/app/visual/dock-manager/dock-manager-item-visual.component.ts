import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  AfterContentInit
} from '@angular/core';

import { SkyDockManagerService } from '../../public';

@Component({
  selector: 'dock-manager-item-visual',
  styleUrls: ['./dock-manager-item-visual.component.scss'],
  templateUrl: './dock-manager-item-visual.component.html'
})
export class DockManagerItemVisualComponent implements AfterContentInit, OnDestroy {

  @Input()
  public stackOrder: number;

  @Input()
  public backgroundColor: string;

  public text = 'Hello.';
  public height = 'auto';

  constructor(
    public elementRef: ElementRef,
    private dockManager: SkyDockManagerService
  ) { }

  public setText(): void {
    this.text = 'Yo';
  }

  public ngAfterContentInit(): void {
    this.dockManager.dockToBottom(this.elementRef, this.stackOrder);
  }

  public ngOnDestroy(): void {
    this.destroy();
  }

  public destroy(): void {
    this.dockManager.removeFromBottom(this.elementRef);
  }

  public setHeight(): void {
    this.height = '100px';
  }
}

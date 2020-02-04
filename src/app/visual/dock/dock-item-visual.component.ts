import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy
} from '@angular/core';

import {
  SkyDockingOptions,
  SkyDockService
} from '../../public';

@Component({
  selector: 'dock-item-visual',
  styleUrls: ['./dock-item-visual.component.scss'],
  templateUrl: './dock-item-visual.component.html'
})
export class DockItemVisualComponent implements AfterViewInit, OnDestroy {

  @Input()
  public settings: {
    borderColor: string;
    stackOrder: number;
  };

  public height = 'auto';

  constructor(
    private elementRef: ElementRef,
    private dockManager: SkyDockService
  ) { }

  public ngAfterViewInit(): void {
    const options: SkyDockingOptions = {
      stackOrder: this.settings.stackOrder
    };

    this.dockManager.dockToBottom(this.elementRef, options);
  }

  public ngOnDestroy(): void {
    this.destroy();
  }

  public destroy(): void {
    this.dockManager.removeFromBottom(this.elementRef);
  }

  public setHeight(): void {
    this.height = '150px';
  }
}

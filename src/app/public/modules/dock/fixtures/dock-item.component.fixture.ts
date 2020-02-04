import {
  AfterViewInit,
  Component,
  ElementRef,
  Input
} from '@angular/core';

import {
  SkyDockService
} from '../dock.service';

import {
  SkyDockingOptions
} from '../docking-options';

@Component({
  selector: 'dock-item-test',
  templateUrl: './dock-item.component.fixture.html'
})
export class DockItemFixtureComponent implements AfterViewInit {

  @Input()
  public dockingOptions: SkyDockingOptions;

  @Input()
  public height: number;

  constructor(
    private dockService: SkyDockService,
    private elementRef: ElementRef
  ) { }

  public ngAfterViewInit(): void {
    this.dockService.dockToBottom(this.elementRef, this.dockingOptions);
  }

  public remove(): void {
    this.dockService.removeFromBottom(this.elementRef);
  }

}

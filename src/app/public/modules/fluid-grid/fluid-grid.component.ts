import {
  Component,
  Input
} from '@angular/core';

import {
  SkyFluidGridGutterSize
} from './fluid-grid-gutter-size';

@Component({
  selector: 'sky-fluid-grid',
  templateUrl: './fluid-grid.component.html',
  styleUrls: [
    './fluid-grid.component.scss'
  ]
})
export class SkyFluidGridComponent {

  @Input()
  public set disableMargin(value: boolean) {
    this._disableMargin = value;
  }

  public get disableMargin(): boolean {
    return this._disableMargin || false;
  }

  @Input()
  public set gutterSize(value: SkyFluidGridGutterSize) {
    this._gutterSize = value;
  }

  public get gutterSize(): SkyFluidGridGutterSize {
    return this._gutterSize || SkyFluidGridGutterSize.Large;
  }

  public gutterSizeTypes = SkyFluidGridGutterSize;

  private _disableMargin: boolean;

  private _gutterSize: SkyFluidGridGutterSize;

}

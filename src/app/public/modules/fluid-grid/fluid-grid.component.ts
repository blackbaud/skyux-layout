import {
  Component,
  Input
} from '@angular/core';

import {
  SkyFluidGridGutterSize
} from './fluid-grid-gutter-size';

import {
  SkyFluidGridGutterSizeType
} from './types/fluid-grid-gutter-size-type';

@Component({
  selector: 'sky-fluid-grid',
  templateUrl: './fluid-grid.component.html',
  styleUrls: [
    './fluid-grid.component.scss'
  ]
})
export class SkyFluidGridComponent {

  /**
   * Disables the outer left and right margin of the fluid grid container.
   * @default false
   */
  @Input()
  public set disableMargin(value: boolean) {
    this._disableMargin = value;
  }

  public get disableMargin(): boolean {
    return this._disableMargin || false;
  }

  /**
   * Specifies a `SkyFluidGridGutterSize` enum to define the size of the padding
   * between columns.
   * @default SkyFluidGridGutterSize.Large
   */
  @Input()
  public set gutterSize(value: SkyFluidGridGutterSizeType) {
    this._gutterSize = value;
  }

  public get gutterSize(): SkyFluidGridGutterSizeType {
    return this._gutterSize === undefined ? SkyFluidGridGutterSize.Large : this._gutterSize;
  }

  /**
   * @internal
   */
  public get gutterSizeResolved(): SkyFluidGridGutterSizeType {
    switch (this.gutterSize) {
      case 'medium':
      case SkyFluidGridGutterSize.Medium:
        return 'medium';
      case 'small':
      case SkyFluidGridGutterSize.Small:
        return 'small';
      default:
        return 'large';
    }
  }

  private _disableMargin: boolean;

  private _gutterSize: SkyFluidGridGutterSizeType;

}

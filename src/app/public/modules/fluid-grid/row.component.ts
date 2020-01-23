import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import {
  SkyFluidGridUtility
} from './fluid-grid-utility';

@Component({
  selector: 'sky-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class SkyRowComponent implements OnInit {

  @Input()
  public reverseColumnOrder: boolean = false;

  /**
   * @internal
   */
  public set gutterSize(value: number) {
    this._gutterSize = value;
    this.updateMarginStyle();
  }

  public get gutterSize(): number {
    return this._gutterSize !== undefined
      ? this._gutterSize
      : SkyFluidGridUtility.defaultGutterSize;
  }

  /**
   * @internal
   */
  public marginStyle: string;

  private _gutterSize: number;

  public ngOnInit(): void {
    this.updateMarginStyle();
  }

  private updateMarginStyle(): void {
    this.marginStyle = `0 -${this.gutterSize}px`;
  }

}

import {
  AfterViewInit,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList
} from '@angular/core';

import {
  SkyColumnComponent
} from './column.component';

import {
  SkyFluidGridGutterSize
} from './fluid-grid-gutter-size';

import {
  SkyFluidGridUtility
} from './fluid-grid-utility';

import {
  SkyRowComponent
} from './row.component';

@Component({
  selector: 'sky-fluid-grid',
  templateUrl: './fluid-grid.component.html'
})
export class SkyFluidGridComponent implements OnInit, AfterViewInit {

  @Input()
  public set disableMargin(value: boolean) {
    this._disableMargin = value;
    this.updateRowGutters();
  }

  public get disableMargin(): boolean {
    return this._disableMargin || false;
  }

  @Input()
  public set gutterSize(value: SkyFluidGridGutterSize) {
    this._gutterSize = value;
    this.paddingStyle = `0 ${this.gutterSize}px`;
    this.updateColumnGutters();
    this.updateRowGutters();
  }

  public get gutterSize(): SkyFluidGridGutterSize {
    return this._gutterSize || SkyFluidGridUtility.defaultGutterSize;
  }

  public paddingStyle: string;

  @ContentChildren(SkyColumnComponent, {descendants: true})
  private columnComponents: QueryList<SkyColumnComponent>;

  @ContentChildren(SkyRowComponent, {descendants: true})
  private rowComponents: QueryList<SkyRowComponent>;

  private _disableMargin: boolean;

  private _gutterSize: SkyFluidGridGutterSize;

  public ngOnInit(): void {
    this.paddingStyle = `0 ${this.gutterSize}px`;
  }

  public ngAfterViewInit(): void {
    this.updateColumnGutters();
    this.updateRowGutters();
  }

  private updateColumnGutters(): void {
    if (this.columnComponents) {
      this.columnComponents.forEach(column => {
        column.gutterSize = this.gutterSize;
      });
    }
  }

  private updateRowGutters(): void {
    if (this.rowComponents) {
      this.rowComponents.forEach(row => {
        row.gutterSize = this.disableMargin ? (this.gutterSize * 2) : this.gutterSize;
      });
    }
  }

}

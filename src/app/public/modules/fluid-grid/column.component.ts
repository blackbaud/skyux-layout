import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {
  SkyFluidGridGutterSize
} from './fluid-grid-gutter-size';

import {
  SkyFluidGridUtility
} from './fluid-grid-utility';

@Component({
  selector: 'sky-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class SkyColumnComponent implements OnInit, OnChanges {

  @Input()
  public screenXSmall: number;

  @Input()
  public screenSmall: number;

  @Input()
  public screenMedium: number;

  @Input()
  public screenLarge: number;

  public set gutterSize(value: SkyFluidGridGutterSize) {
    this._gutterSize = value;
    this.updatePaddingStyle();
  }

  public get gutterSize(): SkyFluidGridGutterSize {
    return this._gutterSize || SkyFluidGridUtility.defaultGutterSize;
  }

  @HostBinding('class')
  public classnames: string;

  @HostBinding('style.padding')
  public paddingStyle: string;

  private _gutterSize: SkyFluidGridGutterSize;

  public ngOnInit(): void {
    this.classnames = this.getClassNames();
    this.updatePaddingStyle();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.screenXSmall || changes.screenSmall || changes.screenMedium || changes.screenLarge) {
      this.classnames = this.getClassNames();
    }
  }

  public getClassNames(): string {
    let classnames = [
      'sky-column'
    ];

    if (this.screenXSmall) {
      classnames.push(`sky-column-xs-${this.screenXSmall}`);
    }

    if (this.screenSmall) {
      classnames.push(`sky-column-sm-${this.screenSmall}`);
    }

    if (this.screenMedium) {
      classnames.push(`sky-column-md-${this.screenMedium}`);
    }

    if (this.screenLarge) {
      classnames.push(`sky-column-lg-${this.screenLarge}`);
    }

    return classnames.join(' ');
  }

  private updatePaddingStyle(): void {
    this.paddingStyle = `0 ${this.gutterSize}px`;
  }
}

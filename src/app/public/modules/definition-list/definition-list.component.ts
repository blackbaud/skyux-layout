import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList
} from '@angular/core';

import {
  Subject
} from 'rxjs';

import {
  SkyDefinitionListMode
} from './types/definition-list-mode';

import {
  SkyDefinitionListOrientation
} from './types/definition-list-orientation';

import {
  SkyDefinitionListContentComponent
} from './definition-list-content.component';

import {
  SkyDefinitionListService
} from './definition-list.service';

/**
 * Creates a definition list to display label-value pairs.
 */
@Component({
  selector: 'sky-definition-list',
  templateUrl: './definition-list.component.html',
  styleUrls: ['./definition-list.component.scss'],
  providers: [SkyDefinitionListService], // TODO: fix service to work the old way
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDefinitionListComponent implements AfterContentInit {

/**
 * Specifies the width of the label portion of the definition list.
 * @default 90px
 */
  @Input()
  public set labelWidth(value: string) {
    this._labelWidth = value;
  }

  public get labelWidth(): string {
    return this._labelWidth || '90px';
  }

/**
 * Specifies a default value to display when no value is provided
 * for a label-value pair.
 * @default 'None found'
 */
  @Input()
  public set defaultValue(value: string) {
    this.definitionListService.defaultValue.next(value);
  }

  @Input()
  public mode: SkyDefinitionListMode = 'default';

  @Input()
  public orientation: SkyDefinitionListOrientation = 'vertical';

  public templateStream: Subject<QueryList<SkyDefinitionListContentComponent>> = new Subject<QueryList<SkyDefinitionListContentComponent>>();

  @ContentChildren(SkyDefinitionListContentComponent)
  private contentComponents: QueryList<SkyDefinitionListContentComponent>

  private _labelWidth: string;

  constructor(
    public definitionListService: SkyDefinitionListService
  ) { }

  public ngAfterContentInit(): void {
    setTimeout(() => {
      this.templateStream.next(this.contentComponents);
    });
  }

  // TODO: figure out with IE 11
  public getGridColumnStyle(): any {
    const columns: string = `${this.labelWidth} auto`;

    if (this.mode === 'default') {
      return { 'grid-template-columns': columns }
    } else {
      return { 'grid-template-columns': 'auto atuo' }
    }

  }
}

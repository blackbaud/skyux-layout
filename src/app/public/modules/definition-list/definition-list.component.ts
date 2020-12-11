import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList
} from '@angular/core';
import { Subject } from 'rxjs';

import {
  SkyDefinitionListContentComponent
} from './definition-list-content.component';

import {
  SkyDefinitionListMode
} from './definition-list-mode';

import {
  SkyDefinitionListOrientation
} from './definition-list-orientation';

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
  providers: [SkyDefinitionListService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDefinitionListComponent implements AfterContentInit {

/**
 * Specifies the width of the label portion of the definition list.
 * @default 90px
 */
  @Input()
  public set labelWidth(value: string) {
    this.definitionListService.labelWidth.next(value);
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
  public mode: SkyDefinitionListMode = 'TermDescription';

  @Input()
  public orientation: SkyDefinitionListOrientation = 'vertical';

  public templateStream: Subject<QueryList<SkyDefinitionListContentComponent>> = new Subject<QueryList<SkyDefinitionListContentComponent>>();

  @ContentChildren(SkyDefinitionListContentComponent)
  private contentComponents: QueryList<SkyDefinitionListContentComponent>

  constructor(
    public definitionListService: SkyDefinitionListService
  ) { }

  public ngAfterContentInit(): void {
    setTimeout(() => {
      this.templateStream.next(this.contentComponents);
    });
  }
}

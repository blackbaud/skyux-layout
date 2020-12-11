import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild
} from '@angular/core';

import {
  SkyDefinitionListService
} from './definition-list.service';

/**
 * Specifies the value in a label-value pair.
 */
@Component({
  selector: 'sky-definition-list-value',
  templateUrl: './definition-list-value.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDefinitionListValueComponent {

  public defaultValue: string;

  @ViewChild('valueTemplateRef', {
    read: TemplateRef,
    static: true
  })
  public templateRef: TemplateRef<any>;

  constructor(
    public service: SkyDefinitionListService
  ) {}

}

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
 * Specifies the label in a label-value pair.
 */
@Component({
  selector: 'sky-definition-list-label',
  templateUrl: './definition-list-label.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDefinitionListLabelComponent {

  public labelWidth: number;

  @ViewChild('labelTemplateRef', {
    read: TemplateRef,
    static: true
  })
  public templateRef: TemplateRef<any>;

  constructor(
    public service: SkyDefinitionListService
  ) { }

}

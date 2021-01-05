import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild
} from '@angular/core';

/**
 * Specifies the label in a label-value pair.
 */
@Component({
  selector: 'sky-definition-list-label',
  templateUrl: './definition-list-label.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDefinitionListLabelComponent {

  @ViewChild('labelTemplateRef', {
    read: TemplateRef,
    static: true
  })
  public templateRef: TemplateRef<any>;

}

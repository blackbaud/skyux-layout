import {
  Component,
  ContentChild,
  ContentChildren,
  QueryList
} from '@angular/core';

import {
  SkyDefinitionListLabelComponent
} from './definition-list-label.component';

import {
  SkyDefinitionListValueComponent
} from './definition-list-value.component';

/**
 * Wraps the label-value pairs in the definition list.
 */
@Component({
  selector: 'sky-definition-list-content',
  templateUrl: './definition-list-content.component.html'
})
export class SkyDefinitionListContentComponent {

  @ContentChild(SkyDefinitionListLabelComponent, {
    read: SkyDefinitionListLabelComponent,
    static: true
  })
  public labelComponent: SkyDefinitionListLabelComponent

  @ContentChildren(SkyDefinitionListValueComponent)
  public valueComponents: QueryList<SkyDefinitionListValueComponent>

}

import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

import { SkyDefinitionListService } from './definition-list.service';

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
export class SkyDefinitionListComponent {

/**
 * Specifies the width of the label portion of the definition list.
 * @default 90px
 */
  @Input()
  public set labelWidth(value: string) {
    this.service.labelWidth.next(value);
  }

/**
 * Specifies the text to display in the value portion of the definition
 * list when no value is available in a label-value pair.
 * @default None found
 */
  @Input()
  public set defaultValue(value: string) {
    this.service.defaultValue.next(value);
  }

  constructor(
    public service: SkyDefinitionListService) { }
}

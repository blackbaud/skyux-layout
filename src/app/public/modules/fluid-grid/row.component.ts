import { Component, Input } from '@angular/core';

/**
 * A previous implementation of the fluid grid allowed for the `sky-row` component to be used
 * without a wrapping `sky-fluid-grid` component; however, this is no longer officially supported.
 */
@Component({
  selector: 'sky-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class SkyRowComponent {
  /**
   * Indicates whether to reverse the display order for columns in the row.
   * @default false
   */
  @Input()
  public reverseColumnOrder: boolean = false;
}

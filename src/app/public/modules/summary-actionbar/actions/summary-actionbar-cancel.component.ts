import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'sky-summary-actionbar-cancel',
  templateUrl: './summary-actionbar-cancel.component.html',
  styleUrls: ['./summary-actionbar-cancel.component.scss']
})
export class SkySummaryActionbarCancelComponent {

  @Input()
  public isDisabled: boolean;

  @Output()
  public actionClick = new EventEmitter<void>();

  public cancelClicked(): void {
    this.actionClick.emit();
  }
}

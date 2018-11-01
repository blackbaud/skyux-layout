import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'sky-summary-actionbar-cancel',
  templateUrl: './summary-actionbar-cancel.component.html'
})
export class SkySummaryActionbarCancelComponent {

  @Input()
  public isDisabled: boolean;

  @Output()
  public actionClick = new EventEmitter<void>();

  public cancelClicked() {
    this.actionClick.emit();
  }

  public enterPress() {
    this.actionClick.emit();
  }
}

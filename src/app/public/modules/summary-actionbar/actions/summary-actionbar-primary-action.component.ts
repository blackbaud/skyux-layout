import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'sky-summary-actionbar-primary-action',
  templateUrl: './summary-actionbar-primary-action.component.html',
  styleUrls: ['./summary-actionbar-primary-action.component.scss']
})
export class SkySummaryActionbarPrimaryActionComponent {

  @Input()
  public isDisabled: boolean;

  @Output()
  public actionClick = new EventEmitter<void>();

  public buttonClicked() {
    this.actionClick.emit();
  }

  public keyPress(event: KeyboardEvent) {
    if (event.which === 13) {
      this.actionClick.emit();
    }
  }

}

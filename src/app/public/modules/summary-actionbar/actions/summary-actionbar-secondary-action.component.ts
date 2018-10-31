import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'sky-summary-actionbar-secondary-action',
  templateUrl: './summary-actionbar-secondary-action.component.html',
  styleUrls: ['./summary-actionbar-secondary-action.component.scss']
})
export class SkySummaryActionbarSecondaryActionComponent {

  @Input()
  public isDisabled: boolean;

  public set isDropdown(value: boolean) {
    this._isDropdown = value;
    this.changeDetector.detectChanges();
  }

  public get isDropdown() {
    return this._isDropdown;
  }

  private _isDropdown: boolean;

  @Output()
  public actionClick = new EventEmitter<void>();

  constructor(private changeDetector: ChangeDetectorRef) {}

  public buttonClicked() {
    this.actionClick.emit();
  }

  public enterPress() {
    this.actionClick.emit();
  }

}

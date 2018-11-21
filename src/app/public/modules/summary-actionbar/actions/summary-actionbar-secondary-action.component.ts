import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output
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

  @Output()
  public actionClick = new EventEmitter<void>();

  private _isDropdown: boolean;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  public buttonClicked(): void {
    this.actionClick.emit();
  }
}

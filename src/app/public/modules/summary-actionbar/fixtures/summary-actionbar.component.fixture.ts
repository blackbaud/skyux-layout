import {
  Component, ViewChild
} from '@angular/core';
import { SkySummaryActionbarSecondaryActionsComponent } from '../actions';
import { SkySummaryActionbarComponent } from '../summary-actionbar.component';

@Component({
  selector: 'sky-summary-actionbar-test',
  templateUrl: './summary-actionbar.component.fixture.html'
})
export class SkySummaryActionbarTestComponent {

  public disableButtons: boolean;
  public extraActions: boolean;
  public noSummary: boolean;
  public noSummaryContent: boolean;

  @ViewChild(SkySummaryActionbarComponent)
  public summaryActionbar: SkySummaryActionbarComponent;

  @ViewChild(SkySummaryActionbarSecondaryActionsComponent)
  public secondaryActions: SkySummaryActionbarSecondaryActionsComponent;

  constructor() {}

  public clilckHandler() {
    return true;
  }
}

import {
  Component, ViewChild
} from '@angular/core';
import { SkySummaryActionbarSecondaryActionsComponent } from '../actions';
import { SkySummaryActionbarComponent } from '../summary-actionbar.component';
import { SkyModalService } from '@skyux/modals';
import { SkySummaryActionbarModalTestComponent } from './summary-actionbar-modal.component.fixture';

@Component({
  selector: 'sky-summary-actionbar-test',
  templateUrl: './summary-actionbar.component.fixture.html'
})
export class SkySummaryActionbarTestComponent {

  public disableButtons: boolean;
  public extraActions: boolean;
  public noSummary: boolean;
  public noSummaryContent: boolean;
  public hideMainActionbar: boolean;

  @ViewChild(SkySummaryActionbarComponent)
  public summaryActionbar: SkySummaryActionbarComponent;

  @ViewChild(SkySummaryActionbarSecondaryActionsComponent)
  public secondaryActions: SkySummaryActionbarSecondaryActionsComponent;

  public openedModal: SkySummaryActionbarModalTestComponent;

  constructor(private modalService: SkyModalService) {}

  public clilckHandler() {
    return true;
  }

  public openModal() {
    let instance = this.modalService.open(SkySummaryActionbarModalTestComponent);
    this.openedModal = instance.componentInstance;
  }

  public openFullScreenModal() {
    let instance = this.modalService.open(SkySummaryActionbarModalTestComponent,
      { fullPage: true });
    this.openedModal = instance.componentInstance;
  }
}

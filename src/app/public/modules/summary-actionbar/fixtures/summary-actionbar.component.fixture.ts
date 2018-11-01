import {
  Component,
  ViewChild
} from '@angular/core';

import {
  SkyModalService
} from '@skyux/modals';

import {
  SkySummaryActionbarSecondaryActionsComponent
} from '../actions';

import {
  SkySummaryActionbarComponent
} from '../summary-actionbar.component';

import {
  SkySummaryActionbarModalTestComponent
} from './summary-actionbar-modal.component.fixture';

@Component({
  selector: 'sky-summary-actionbar-test',
  templateUrl: './summary-actionbar.component.fixture.html'
})
export class SkySummaryActionbarTestComponent {

  public disableButtons: boolean;

  public extraActions: boolean;

  public hideMainActionbar: boolean;

  public noSummary: boolean;

  public noSummaryContent: boolean;

  public openedModal: SkySummaryActionbarModalTestComponent;

  @ViewChild(SkySummaryActionbarSecondaryActionsComponent)
  public secondaryActions: SkySummaryActionbarSecondaryActionsComponent;

  @ViewChild(SkySummaryActionbarComponent)
  public summaryActionbar: SkySummaryActionbarComponent;

  constructor(
    private modalService: SkyModalService
  ) { }

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

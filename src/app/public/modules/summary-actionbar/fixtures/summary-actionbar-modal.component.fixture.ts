import { Component, ViewChild } from '@angular/core';
import { SkyModalInstance } from '@skyux/modals/modules/modal';
import { SkySummaryActionbarComponent } from '../summary-actionbar.component';

@Component({
  selector: 'sky-test-cmp-modal',
  templateUrl: './summary-actionbar-modal.component.fixture.html'
})
export class SkySummaryActionbarModalTestComponent {

  @ViewChild(SkySummaryActionbarComponent)
  public summaryActionbar: SkySummaryActionbarComponent;

  constructor(public instance: SkyModalInstance) {}

}

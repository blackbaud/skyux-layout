import {
  Component
} from '@angular/core';

import {
  SkyModalService
} from '@skyux/modals';

import {
  SkySummaryActionbarModalDemoComponent
} from './summary-actionbar-modal-demo.component';

@Component({
  selector: 'sky-summary-actionbar-demo',
  templateUrl: './summary-actionbar-demo.component.html',
  styleUrls: ['./summary-actionbar-demo.component.scss']
})
export class SkySummaryActionbarDemoComponent {

  constructor(
    private modalService: SkyModalService
  ) { }

  public printHello() {
    console.log('hello');
  }

  public openModal() {
    this.modalService.open(SkySummaryActionbarModalDemoComponent);
  }

  public openFullScreenModal() {
    this.modalService.open(SkySummaryActionbarModalDemoComponent, { fullPage: true });
  }
}

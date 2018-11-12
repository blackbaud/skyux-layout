import {
  Component
} from '@angular/core';

import {
  SkyModalInstance
} from '@skyux/modals';

@Component({
  selector: 'sky-test-cmp-modal',
  templateUrl: './summary-actionbar-modal-demo.component.html',
  styleUrls: ['./summary-actionbar-modal-demo.component.scss']
})
export class SkySummaryActionbarModalDemoComponent {
  constructor(
    public instance: SkyModalInstance
  ) { }

  public printHello() {
    console.log('hello');
  }

}

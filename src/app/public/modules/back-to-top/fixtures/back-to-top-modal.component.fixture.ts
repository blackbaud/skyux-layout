import {
  Component
} from '@angular/core';

import {
  SkyModalInstance
} from '@skyux/modals';

@Component({
  selector: 'sky-back-to-top-modal-fixture',
  templateUrl: './back-to-top-modal.component.fixture.html'
})
export class SkyBackToTopModalFixtureComponent {

  constructor(
    public modalInstance: SkyModalInstance
  ) { }

}

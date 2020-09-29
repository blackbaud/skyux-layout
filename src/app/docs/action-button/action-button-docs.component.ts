import {
  Component
} from '@angular/core';

import {
  SkyActionButtonPermalink
} from '../../public/public_api';

@Component({
  selector: 'app-action-button-docs',
  templateUrl: './action-button-docs.component.html'
})
export class ActionButtonDocsComponent {

  public routerlink: SkyActionButtonPermalink = {
    route: {
      commands: [],
      extras: {
        queryParams: {
          component: 'MyComponent'
        }
      }
    }
  };

  public url: SkyActionButtonPermalink = {
    url: 'https://developer.blackbaud.com/skyux/components'
  };

  public filterActionClick(): void {
    alert('Filter action clicked');
  }

  public openActionClick(): void {
    alert('Open action clicked');
  }

}

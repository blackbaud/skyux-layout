import {
  Component
} from '@angular/core';

import {
  Subject
} from 'rxjs';

import {
  SkyBackToTopMessage
} from '../back-to-top-message';

@Component({
  selector: 'sky-back-to-top-fixture',
  templateUrl: './back-to-top.component.fixture.html'
})
export class SkyBackToTopFixtureComponent {

  public height: number;

  public scrollableParent: boolean;

  public hideBackToTopButton: boolean = false;

  public backToTopController: Subject<SkyBackToTopMessage> = new Subject();
}

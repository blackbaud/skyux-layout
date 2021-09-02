import {
  Component, ElementRef, ViewChild
} from '@angular/core';

import {
  Subject
} from 'rxjs';

import {
  SkyBackToTopMessage
} from '../models/back-to-top-message';

import {
  SkyBackToTopOptions
} from '../models/back-to-top-options';

@Component({
  selector: 'sky-back-to-top-fixture',
  templateUrl: './back-to-top.component.fixture.html',
  styleUrls: ['./back-to-top.component.fixture.scss']
})
export class SkyBackToTopFixtureComponent {

  public height: number;

  public hideTarget: boolean = false;

  public scrollableParent: boolean;

  public backToTopController: Subject<SkyBackToTopMessage> = new Subject();

  public backToTopOptions: SkyBackToTopOptions = {
    buttonHidden: false
  };

  @ViewChild('containerElement')
  private container: ElementRef;

  @ViewChild('alternateLocation')
  private alternateLocation: ElementRef;

  public moveContent(): void {
    this.alternateLocation.nativeElement.appendChild(this.container.nativeElement);
  }
}

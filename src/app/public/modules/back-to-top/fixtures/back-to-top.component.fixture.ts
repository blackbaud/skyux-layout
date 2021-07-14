import {
  Component,
  OnDestroy
} from '@angular/core';

import {
  SkyModalInstance,
  SkyModalService
} from '@skyux/modals';

import {
  Subject
} from 'rxjs';

import {
  SkyBackToTopMessage
} from '../models/back-to-top-message';

import {
  SkyBackToTopOptions
} from '../models/back-to-top-options';

import {
  SkyBackToTopModalFixtureComponent
} from './back-to-top-modal.component.fixture';

@Component({
  selector: 'sky-back-to-top-fixture',
  templateUrl: './back-to-top.component.fixture.html'
})
export class SkyBackToTopFixtureComponent implements OnDestroy {

  public height: number;

  public scrollableParent: boolean;

  public backToTopController: Subject<SkyBackToTopMessage> = new Subject();

  public backToTopOptions: SkyBackToTopOptions = {
    buttonHidden: false
  };

  private modalInstance: SkyModalInstance;

  constructor(private modalService: SkyModalService) {}

  public ngOnDestroy(): void {
    if (this.modalInstance) {
      this.modalInstance.close();
    }
  }

  public openModal(): void {
    this.modalInstance = this.modalService.open(SkyBackToTopModalFixtureComponent);
  }
}

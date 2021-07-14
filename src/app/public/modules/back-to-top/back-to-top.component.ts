import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

import {
  Observable,
  Subject
} from 'rxjs';

import {
  SkyBackToTopType
} from './models/back-to-top-type';

/**
 * @internal
 */
@Component({
  selector: 'sky-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: [
    './back-to-top.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyBackToTopComponent {

  @Input()
  public type: SkyBackToTopType;

  public get scrollToTopClick(): Observable<void> {
    return this._scrollToTopClick.asObservable();
  }

  private _scrollToTopClick = new Subject<void>();

  public onScrollToTopClick(): void {
    this._scrollToTopClick.next();
    this._scrollToTopClick.complete();
  }

}

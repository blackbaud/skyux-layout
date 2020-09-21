import {
  Component,
  Input,
  OnDestroy
} from '@angular/core';

import {
  SkyMediaBreakpoints,
  SkyMediaQueryService
} from '@skyux/core';

import {
  Subscription
} from 'rxjs';

const FONTSIZECLASS_SMALL = '2x';
const FONTSIZECLASS_LARGE = '3x';

@Component({
  selector: 'sky-action-button-icon',
  styleUrls: ['./action-button-icon.component.scss'],
  templateUrl: './action-button-icon.component.html'
})
export class SkyActionButtonIconComponent implements OnDestroy {

/**
 * Specifies an icon from the
 * [Font Awesome library](https://fontawesome.com/v4.7.0/).
 * For example, to display the `fa-filter` icon on the action button,
 * set `iconType` to `filter`. SKY UX supports version 4.7.0 of Font Awesome.
 * For more information about icons in SKY UX, see the
 * [icons design pattern](https://developer.blackbaud.com/skyux/design/styles/icons).
 */
  @Input()
  public iconType: string;

  public fontSizeClass: string = FONTSIZECLASS_LARGE;

  private subscription: Subscription;

  constructor(private mediaQueryService: SkyMediaQueryService) {
    this.subscription = this.mediaQueryService.subscribe((args: SkyMediaBreakpoints) => {
      if (args === SkyMediaBreakpoints.xs) {
        this.fontSizeClass = FONTSIZECLASS_SMALL;
      } else {
        this.fontSizeClass = FONTSIZECLASS_LARGE;
      }
    });
  }

  public ngOnDestroy() {
    /* istanbul ignore else */
    /* sanity check */
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

import {
  Injectable
} from '@angular/core';

import {
  BehaviorSubject
} from 'rxjs';

/**
 * @internal
 */
@Injectable()
export class SkyDescriptionListService {

  public defaultDescription = new BehaviorSubject<string>('');

}

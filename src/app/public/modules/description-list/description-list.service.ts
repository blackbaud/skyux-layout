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

  public defaultValue = new BehaviorSubject<string>('');

}

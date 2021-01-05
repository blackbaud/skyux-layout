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
export class SkyDefinitionListService {

  public defaultValue = new BehaviorSubject<string>('');

}

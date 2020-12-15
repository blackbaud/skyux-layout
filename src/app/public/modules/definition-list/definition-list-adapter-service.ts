import {
  ElementRef,
  Injectable
} from '@angular/core';

/**
 * @internal
 */
@Injectable()
export class SkyDefinitionListAdapterService {

  public getWidth(elementRef: ElementRef) {
    return elementRef.nativeElement.clientWidth;
  }

}

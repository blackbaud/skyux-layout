import {
  ElementRef,
  Injectable
} from '@angular/core';

/**
 * @internal
 */
@Injectable()
export class SkyDefinitionListAdapterService {

  public getWidth(elementRef: ElementRef): number {
    return elementRef.nativeElement.clientWidth;
  }

}

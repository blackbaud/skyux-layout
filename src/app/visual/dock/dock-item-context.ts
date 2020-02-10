import {
  Injectable
} from '@angular/core';

@Injectable()
export class DockItemVisualContext {

  public readonly backgroundColor: string;

  public readonly stackOrder: number;

  constructor(
    backgroundColor: string,
    stackOrder: number
  ) {
    this.backgroundColor = backgroundColor;
    this.stackOrder = stackOrder;
  }

}

import {
  StaticProvider
} from '@angular/core';

export interface SkyDockItemConfig {

  /**
   * Static providers to inject into the dock item component.
   */
  providers?: StaticProvider[];

  /**
   * The stack order of the element. The higher the number, the higher
   * the element will be placed in the dock. By default, new elements will be placed at
   * the top of the stack.
   */
  stackOrder?: number;

}

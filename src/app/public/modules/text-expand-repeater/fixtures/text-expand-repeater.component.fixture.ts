import { Component, ViewChildren, QueryList } from '@angular/core';
import { SkyTextExpandRepeaterComponent } from '../text-expand-repeater.component';

@Component({
  selector: 'sky-text-expand-repeater-demo',
  templateUrl: './text-expand-repeater.component.fixture.html'
})
export class TextExpandRepeaterTestComponent {
  @ViewChildren(SkyTextExpandRepeaterComponent, { read: SkyTextExpandRepeaterComponent })
  public textExpand: QueryList<SkyTextExpandRepeaterComponent>;
  public data: string[];
  public data2: any[];
  public numItems: number;
}

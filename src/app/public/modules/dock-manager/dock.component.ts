import {
  ChangeDetectionStrategy,
  Component,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'sky-dock',
  template: '',
  styleUrls: ['./dock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDockComponent {

  constructor(
    public elementRef: ElementRef
  ) { }

}

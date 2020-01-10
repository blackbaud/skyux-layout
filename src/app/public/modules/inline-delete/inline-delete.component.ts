import {
  AnimationEvent
} from '@angular/animations';

import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';

import {
  skyAnimationEmerge
} from '@skyux/animations';

import {
  SkyInlineDeleteType
 } from './inline-delete-type';

/**
 * Auto-incrementing integer used to generate unique ids for inline delete components.
 */
let nextId = 0;

@Component({
  selector: 'sky-inline-delete',
  styleUrls: ['./inline-delete.component.scss'],
  templateUrl: './inline-delete.component.html',
  animations: [
    skyAnimationEmerge
  ]
})
export class SkyInlineDeleteComponent {

  @Input()
  public pending: boolean = false;

  @Output()
  public cancelTriggered = new EventEmitter<void>();

  @Output()
  public deleteTriggered = new EventEmitter<void>();

  @ViewChild('delete')
  public deleteButton: ElementRef;

  public animationState: string = 'open';

  public assistiveTextId: string = `sky-inline-delete-assistive-text-${++nextId}`;

  public type: SkyInlineDeleteType = SkyInlineDeleteType.Standard;

  constructor(private changeDetector: ChangeDetectorRef) {}

  public setType(type: SkyInlineDeleteType): void {
    this.type = type;
    this.changeDetector.detectChanges();
  }

  public onAnimationDone(event: AnimationEvent): void {
    if (event.toState === 'closed') {
      this.cancelTriggered.emit();
    } else {
      this.deleteButton.nativeElement.focus();
    }
  }

}

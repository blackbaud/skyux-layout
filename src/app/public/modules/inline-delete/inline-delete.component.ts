import {
  animate,
  AnimationEvent,
  group,
  query,
  style,
  transition,
  trigger
} from '@angular/animations';

import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

import {
  SkyInlineDeleteAdapterService
} from './inline-delete-adapter.service';

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
    trigger('inlineDeleteAnimation', [
      transition('* => shown', [
        style({
          opacity: 0
        }),
        query('.sky-inline-delete-content-animation-container',
          style({ transform: 'scale(0.0)' })),
        group([
          animate('300ms ease-in-out', style({ opacity: 1 })),
          query('.sky-inline-delete-content-animation-container', animate('300ms ease-in-out', style({
            transform: 'scale(1)'
          })))
        ])
      ]),
      transition(`shown <=> *`, [
        query('.sky-inline-delete-content-animation-container',
          style({ transform: 'scale(1)' })),
        group([
          animate('300ms ease-in-out', style({
            opacity: 0
          })),
          query('.sky-inline-delete-content-animation-container', animate('300ms ease-in-out', style({
            transform: 'scale(0.0)'
          })))
        ])
      ])
    ])
  ],
  providers: [SkyInlineDeleteAdapterService]
})
export class SkyInlineDeleteComponent implements OnDestroy, OnInit {

  /**
   * Specifies if the deletion is pending.
   * @default "false"
   */
  @Input()
  public pending: boolean = false;

  /**
   * Fires when users click the cancel button.
   */
  @Output()
  public cancelTriggered = new EventEmitter<void>();

  /**
   * Fires when users click the delete button.
   */
  @Output()
  public deleteTriggered = new EventEmitter<void>();

  @ViewChild('delete')
  public deleteButton: ElementRef;

  public animationState: string = 'shown';

  public assistiveTextId: string = `sky-inline-delete-assistive-text-${++nextId}`;

  public type: SkyInlineDeleteType = SkyInlineDeleteType.Standard;

  constructor(
    private adapterService: SkyInlineDeleteAdapterService,
    private changeDetector: ChangeDetectorRef,
    private elRef: ElementRef
  ) { }

  /**
   * Initialization lifecycle hook
   * @internal
   */
  public ngOnInit(): void {
    this.animationState = 'shown';
    this.adapterService.setEl(this.elRef.nativeElement);
  }

  /**
   * Destruction lifecycle hook
   * @internal
   */
  public ngOnDestroy(): void {
    this.adapterService.clearListeners();
  }

  /**
   * Sets the inline delete to one of its predefined types.
   * @param type The inline delete type
   * @internal
   */
  public setType(type: SkyInlineDeleteType): void {
    this.type = type;
    this.changeDetector.detectChanges();
  }

  /**
   * Handles actions that should be taken after the inline delete animates
   * @param event The animation event
   * @internal
   */
  public onAnimationDone(event: AnimationEvent): void {
    if (event.toState === 'hidden') {
      this.cancelTriggered.emit();
    } else {
      this.deleteButton.nativeElement.focus();
    }
  }

}

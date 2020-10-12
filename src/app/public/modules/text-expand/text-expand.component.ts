import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import {
  SkyModalService
} from '@skyux/modals';

import {
  SkyTextExpandAdapterService
} from './text-expand-adapter.service';

import {
  SkyTextExpandModalComponent
} from './text-expand-modal.component';

import {
  SkyTextExpandModalContext
} from './text-expand-modal-context';

/**
 * Auto-incrementing integer used to generate unique ids for text expand components.
 */
let nextId = 0;

@Component({
  selector: 'sky-text-expand',
  templateUrl: './text-expand.component.html',
  styleUrls: ['./text-expand.component.scss'],
  providers: [
    SkyTextExpandAdapterService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyTextExpandComponent implements OnInit, OnChanges {

  /**
   * Specifies a title to display when the component expands the full text in a modal.
   * @default 'Expanded view'
   */
  @Input()
  public expandModalTitle: string;

  /**
   * Specifies the maximum number of text characters to display inline when users select the link
   * to expand the full text. If the text exceeds this limit, then the component expands
   * the full text in a modal instead.
   */
  @Input()
  public maxExpandedLength: number = 600;

  /**
   * Specifies the maximum number of newline characters to display inline when users select
   * the link to expand the full text. If the text exceeds this limit, then
   * the component expands the full text in a modal view instead.
   */
  @Input()
  public maxExpandedNewlines: number = 2;

  /**
   * Specifies the number of text characters to display before truncating the text.
   * To avoid truncating text in the middle of a word, the component looks for a space
   * in the 10 characters before the last character.
   * @default 200
   */
  @Input()
  public set maxLength(value: number) {
    this._maxLength = value;
  }

  public get maxLength(): number {
    return this._maxLength || 200;
  }

  /**
   * Specifies the text to truncate.
   */
  @Input()
  public set text(value: string) {
    this._text = value;
  }

  public get text(): string {
    return this._text || '';
  }

  /**
   * Indicates whether to replace newline characters in truncated text with spaces.
   */
  @Input()
  public set truncateNewlines(value: boolean) {
    this._truncateNewlines = value;
  }

  public get truncateNewlines(): boolean {
    if (this._truncateNewlines === undefined) {
      return true;
    }
    return this._truncateNewlines;
  }

  public contentSectionId: string = `sky-text-expand-content-${++nextId}`;

  public disabled: boolean = false;

  public isExpandable: boolean = true;

  public isExpanded: boolean = true;

  public isModal: boolean = false;

  @ViewChild('container', { read: ElementRef })
  private containerElementRef: ElementRef;

  @ViewChild('text', { read: ElementRef })
  private textElementRef: ElementRef;

  private textForDisplay: string;

  private _maxLength: number;

  private _text: string;

  private _truncateNewlines: boolean;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private modalService: SkyModalService,
    private textExpandAdapter: SkyTextExpandAdapterService
  ) { }

  public ngOnInit(): void {
    this.reset();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes.text && !changes.text.firstChange) ||
      (changes.maxLength && !changes.maxLength.firstChange)
    ) {
      this.reset();
    }
  }

  public onButtonClick(): void {
    if (this.isModal) {
      this.launchModal();
    } else {
      this.toggleText();
    }
  }

  public onTransitionEnd(): void {
    this.disabled = false;

    // Set the truncated text after the animation has completed.
    if (!this.isExpanded) {
      this.textForDisplay = this.getTruncatedText(this.text, this.maxLength);
      this.textExpandAdapter.setText(this.textElementRef, this.textForDisplay);
    }

    // Clear out any height styles that were applied during the animation.
    this.textExpandAdapter.setContainerHeight(this.containerElementRef, undefined);
    this.changeDetector.markForCheck();
  }

  private reset(): void {
    const truncatedText = this.getTruncatedText(this.text, this.maxLength);
    this.textExpandAdapter.setText(this.textElementRef, truncatedText);
    this.textExpandAdapter.setContainerHeight(this.containerElementRef, undefined);

    this.isExpandable = (truncatedText !== this.text);
    this.isExpanded = false;

    const newlinesExceedMax = (this.getNewlineCount(this.text) > this.maxExpandedNewlines);
    const textLengthExceedsMax = (this.text.length > this.maxExpandedLength);

    this.isModal = (newlinesExceedMax || textLengthExceedsMax);

    this.changeDetector.markForCheck();
  }

  private toggleText(): void {
    this.disabled = true;
    this.isExpanded = !this.isExpanded;
    this.changeDetector.markForCheck();

    const newText = (this.isExpanded)
      ? this.text
      : this.getTruncatedText(this.text, this.maxLength);

    // Determine the new height based on the new text value.
    const currentHeight = this.textExpandAdapter.getContainerHeight(this.containerElementRef);
    this.textExpandAdapter.setText(this.textElementRef, newText);
    this.textExpandAdapter.setContainerHeight(this.containerElementRef, undefined);
    const newHeight = this.textExpandAdapter.getContainerHeight(this.containerElementRef);

    // If the new text is smaller than the old text, put the old text back before doing
    // the collapse animation to avoid showing a big chunk of whitespace.
    if (newHeight < currentHeight) {
      this.textExpandAdapter.setText(this.textElementRef, this.textForDisplay);
    }

    // Apply height animation.
    this.textExpandAdapter.setContainerHeight(this.containerElementRef, `${currentHeight}px`);
    setTimeout(() => {
      this.textForDisplay = newText;
      this.textExpandAdapter.setContainerHeight(this.containerElementRef, `${newHeight}px`);
    });
  }

  private launchModal(): void {
    const instance = this.modalService.open(
      SkyTextExpandModalComponent,
      [
        {
          provide: SkyTextExpandModalContext,
          useValue: {
            header: this.expandModalTitle,
            text: this.text
          }
        }
      ]
    );

    instance.closed.subscribe(() => {
      this.disabled = false;
      this.changeDetector.markForCheck();
    });
  }

  private getNewlineCount(value: string): number {
    let matches = value.match(/\n/gi);

    if (matches) {
      return matches.length;
    }

    return 0;
  }

  private getTruncatedText(value: string, length: number): string {
    let i: number;
    if (this.truncateNewlines) {
      value = value.replace(/\n+/gi, ' ');
    }
    // Jump ahead one character and see if it's a space, and if it isn't,
    // back up to the first space and break there so a word doesn't get cut
    // in half.
    if (length < value.length) {
      for (i = length; i > length - 10; i--) {
        if (/\s/.test(value.charAt(i))) {
          length = i;
          break;
        }
      }
    }
    return value.substr(0, length);
  }
}

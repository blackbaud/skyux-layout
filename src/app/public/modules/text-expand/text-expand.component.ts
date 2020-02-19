import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  SkyLibResourcesService
} from '@skyux/i18n';

import {
  SkyModalService
} from '@skyux/modals';

import 'rxjs/add/observable/forkJoin';

import 'rxjs/add/operator/take';

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
export class SkyTextExpandComponent implements OnInit {

  @Input()
  public expandModalTitle: string;

  @Input()
  public maxExpandedLength: number = 600;

  @Input()
  public maxExpandedNewlines: number = 2;

  @Input()
  public set maxLength(value: number) {
    this._maxLength = value;
    this.reset();
  }

  public get maxLength(): number {
    return this._maxLength || 200;
  }

  @Input()
  public set text(value: string) {
    this._text = value;
    this.reset();
  }

  public get text(): string {
    return this._text || '';
  }

  @Input()
  public truncateNewlines: boolean = true;

  public contentSectionId: string = `sky-text-expand-content-${++nextId}`;

  public disabled: boolean = false;

  public isExpandable: boolean = true;

  public isExpanded: boolean = true;

  public isModal: boolean = false;

  private textForDisplay: string;

  @ViewChild('container', {
    read: ElementRef,
    static: true
  })
  private containerElementRef: ElementRef;

  @ViewChild('text', {
    read: ElementRef,
    static: true
  })
  private textElementRef: ElementRef;

  private _maxLength: number;

  private _text: string;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private resources: SkyLibResourcesService,
    private modalService: SkyModalService,
    private textExpandAdapter: SkyTextExpandAdapterService
  ) { }

  public ngOnInit(): void {
    if (!this.expandModalTitle) {
      this.resources.getString('skyux_text_expand_modal_title')
        .take(1)
        .subscribe(resource => {
          this.expandModalTitle = resource;
        });
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

    this.isExpandable = (truncatedText.length < this.text.length);
    this.isExpanded = false;

    this.isModal = (
      this.getNewlineCount(this.text) > this.maxExpandedNewlines ||
      this.text.length > this.maxExpandedLength
    );

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

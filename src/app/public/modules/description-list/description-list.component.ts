import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  QueryList,
  ViewChild
} from '@angular/core';

import {
  takeUntil
} from 'rxjs/operators';

import {
  Subject
} from 'rxjs';

import {
  SkyDescriptionListMode
} from './types/description-list-mode';

import {
  SkyDescriptionListOrientation
} from './types/description-list-orientation';

import {
  SkyDescriptionListAdapterService
} from './description-list-adapter-service';

import {
  SkyDescriptionListContentComponent
} from './description-list-content.component';

import {
  SkyDescriptionListService
} from './description-list.service';

/**
 * Creates a description list to display term-description pairs.
 */
@Component({
  selector: 'sky-description-list',
  templateUrl: './description-list.component.html',
  styleUrls: ['./description-list.component.scss'],
  providers: [SkyDescriptionListService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDescriptionListComponent implements AfterContentInit, OnDestroy {

/**
 * Specifies a default value to display when no value is provided
 * for a term-description pair.
 * @default 'None found'
 */
  @Input()
  public set defaultValue(value: string) {
    this.descriptionListService.defaultValue.next(value);
  }

  /**
   * Specifies the width of the list item when in name-value pair mode. If not provided,
   * the list items will have responsive widths at different sizes.
   */
  @Input()
  public listItemWidth: boolean;

  /** Specifies the mode */
  @Input()
  public mode: SkyDescriptionListMode = SkyDescriptionListMode.nameValuePair;

  @Input()
  public orientation: SkyDescriptionListOrientation = 'vertical';

  @ContentChildren(SkyDescriptionListContentComponent)
  public contentComponents: QueryList<SkyDescriptionListContentComponent>;

  @ViewChild('descriptionListElement', {
    read: ElementRef,
    static: true
  })
  private elementRef: ElementRef;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private adapterService: SkyDescriptionListAdapterService,
    private changeDetector: ChangeDetectorRef,
    private descriptionListService: SkyDescriptionListService
  ) { }

  public ngAfterContentInit(): void {

    // Wait for all content to render before detecting parent width.
    setTimeout(() => {
      this.updateResponsiveClass();
    });

    this.contentComponents.changes
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.changeDetector.markForCheck();
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    this.updateResponsiveClass();
  }

  private updateResponsiveClass(): void {
    this.adapterService.setResponsiveClass(this.elementRef);
    this.changeDetector.markForCheck();
  }
}

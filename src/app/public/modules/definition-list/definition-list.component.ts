import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
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
  SkyDefinitionListMode
} from './types/definition-list-mode';

import {
  SkyDefinitionListOrientation
} from './types/definition-list-orientation';

import {
  SkyDefinitionListAdapterService
} from './definition-list-adapter-service';

import {
  SkyDefinitionListContentComponent
} from './definition-list-content.component';

import {
  SkyDefinitionListHeadingComponent
} from './definition-list-heading.component';

import {
  SkyDefinitionListService
} from './definition-list.service';

/**
 * Creates a definition list to display label-value pairs.
 */
@Component({
  selector: 'sky-definition-list',
  templateUrl: './definition-list.component.html',
  styleUrls: ['./definition-list.component.scss'],
  providers: [SkyDefinitionListService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDefinitionListComponent implements AfterContentInit, OnDestroy {

/**
 * Specifies the width of the label portion of the definition list.
 * @default 90px
 */
  @Input()
  public set labelWidth(value: string) {
    this._labelWidth = value;
  }

  public get labelWidth(): string {
    return this._labelWidth || '90px';
  }

/**
 * Specifies a default value to display when no value is provided
 * for a label-value pair.
 * @default 'None found'
 */
  @Input()
  public set defaultValue(value: string) {
    this.definitionListService.defaultValue.next(value);
  }

  @Input()
  public mode: SkyDefinitionListMode = SkyDefinitionListMode.fixedWidth;

  @Input()
  public orientation: SkyDefinitionListOrientation = 'vertical';

  public isMobile: boolean = false;

  @ContentChildren(SkyDefinitionListContentComponent)
  public contentComponents: QueryList<SkyDefinitionListContentComponent>;

  @ContentChild(SkyDefinitionListHeadingComponent)
  private headerComponent: SkyDefinitionListHeadingComponent;

  @ViewChild('definitionListElement', {
    read: ElementRef,
    static: true
  })
  private elementRef: ElementRef;

  private ngUnsubscribe = new Subject<void>();

  private _labelWidth: string;

  constructor(
    private adapterSerivce: SkyDefinitionListAdapterService,
    private changeDetector: ChangeDetectorRef,
    private definitionListService: SkyDefinitionListService
  ) { }

  public ngAfterContentInit(): void {
    if (this.headerComponent) {
      console.warn(
        '[Deprecation warning] Do not use the `<sky-definition-list-heading>` component in your template (this will be a breaking change in the next major version release).\n' +
        'Instead, include a header above the defintion list component that uses a SKY UX' +
        ' supported class:\n' +
        '<h3 class="sky-subsection-heading sky-margin-stacked-compact">\n  My list' +
        '\n</h3>\n<sky-definition-list>\n  ...\n</sky-definition-list>'
      );
    }

    this.checkParentWidth();

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

  @HostListener('window:resize', [])
  public onWindowResize(): void {
    this.checkParentWidth();
  }

  private checkParentWidth(): void {
    this.isMobile = this.adapterSerivce.getWidth(this.elementRef) <= 480;
    this.changeDetector.markForCheck();
  }
}

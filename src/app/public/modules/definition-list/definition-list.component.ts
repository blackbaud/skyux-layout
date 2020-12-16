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
  Subject,
  Subscription
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
  SkyDefinitionListService
} from './definition-list.service';
import { SkyDefinitionListHeadingComponent } from './definition-list-heading.component';

/**
 * Creates a definition list to display label-value pairs.
 */
@Component({
  selector: 'sky-definition-list',
  templateUrl: './definition-list.component.html',
  styleUrls: ['./definition-list.component.scss'],
  providers: [SkyDefinitionListService], // TODO: fix service to work the old way
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
  public mode: SkyDefinitionListMode = 'default';

  @Input()
  public orientation: SkyDefinitionListOrientation = 'vertical';

  public isMobile: boolean = false;

  // TODO: add descriptor here!
  public templateStream: Subject<QueryList<SkyDefinitionListContentComponent>> =
    new Subject<QueryList<SkyDefinitionListContentComponent>>();

  private mediaQuerySubscription: Subscription;

  @ContentChildren(SkyDefinitionListContentComponent)
  private contentComponents: QueryList<SkyDefinitionListContentComponent>;

  @ContentChild(SkyDefinitionListHeadingComponent)
  private headerComponent: SkyDefinitionListHeadingComponent;

  @ViewChild('definitionListElement', {
    read: ElementRef,
    static: true
  })
  private elementRef: ElementRef;

  private _labelWidth: string;

  constructor(
    public definitionListService: SkyDefinitionListService,
    private changeDetector: ChangeDetectorRef,
    private adapterSerivce: SkyDefinitionListAdapterService
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

    setTimeout(() => {
      this.templateStream.next(this.contentComponents);
    });
    this.checkParentWidth();
  }

  public ngOnDestroy(): void {
    if (this.mediaQuerySubscription) {
      this.mediaQuerySubscription.unsubscribe();
    }
  }

  @HostListener('window:resize', ['$event'])
  public onWindowResize(event: any): void {
    this.checkParentWidth();
  }

  // TODO: figure out with IE 11
  public getGridColumnStyle(): any {
    if (this.mode === 'default') {
      return { 'grid-template-columns': `${this.labelWidth} auto` };
    }
  }

  private checkParentWidth(): void {
    this.isMobile = this.adapterSerivce.getWidth(this.elementRef) <= 480;
    this.changeDetector.markForCheck();
  }
}

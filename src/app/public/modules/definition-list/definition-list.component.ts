import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  OnDestroy,
  QueryList
} from '@angular/core';

import {
  SkyMediaBreakpoints,
  SkyMediaQueryService
} from '@skyux/core';

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
  SkyDefinitionListContentComponent
} from './definition-list-content.component';

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

  public currentBreakpoint: string;

  // TODO: add descriptor here!
  public templateStream: Subject<QueryList<SkyDefinitionListContentComponent>> =
    new Subject<QueryList<SkyDefinitionListContentComponent>>();

  private mediaQuerySubscription: Subscription;

  @ContentChildren(SkyDefinitionListContentComponent)
  private contentComponents: QueryList<SkyDefinitionListContentComponent>;

  private _labelWidth: string;

  constructor(
    public definitionListService: SkyDefinitionListService,
    private changeDetector: ChangeDetectorRef,
    private mediaQueryService: SkyMediaQueryService
  ) { }

  public ngAfterContentInit(): void {
    setTimeout(() => {
      this.templateStream.next(this.contentComponents);
    });

    this.mediaQuerySubscription = this.mediaQueryService.subscribe((newBreakpoint: SkyMediaBreakpoints) => {
      switch (newBreakpoint) {
        case SkyMediaBreakpoints.xs:
          this.currentBreakpoint = 'xs';
          break;
        case SkyMediaBreakpoints.sm:
          this.currentBreakpoint = 'sm';
          break;
        case SkyMediaBreakpoints.md:
          this.currentBreakpoint = 'md';
          break;
        case SkyMediaBreakpoints.lg:
          this.currentBreakpoint = 'lg';
          break;
        default:
          this.currentBreakpoint = 'unknown';
      }
      this.changeDetector.markForCheck();
    });
    this.changeDetector.markForCheck();
  }

  public ngOnDestroy(): void {
    if (this.mediaQuerySubscription) {
      this.mediaQuerySubscription.unsubscribe();
    }
  }

  // TODO: figure out with IE 11
  public getGridColumnStyle(): any {
    const columns: string = `${this.labelWidth} auto`;

    if (this.mode === 'default') {
      return { 'grid-template-columns': columns };
    } else {
      return { 'grid-template-columns': 'auto atuo' };
    }

  }
}

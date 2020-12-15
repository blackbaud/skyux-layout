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
    const columns: string = `${this.labelWidth} auto`;

    if (this.mode === 'default') {
      return { 'grid-template-columns': columns };
    } else {
      return { 'grid-template-columns': 'auto atuo' };
    }
  }

  private checkParentWidth(): void {
    this.isMobile = this.adapterSerivce.getWidth(this.elementRef) <= 480;
    this.changeDetector.markForCheck();
  }
}

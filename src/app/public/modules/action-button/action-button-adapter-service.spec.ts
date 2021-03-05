import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';

import {
  SkyAcitonButtonAdapterService
} from './action-button-adapter-service';

@Component({
  selector: 'sky-test-cmp',
  template: `<div [style.width]="width" #el>Hello world</div>`
})
class SkyActionButtonAdapterTestComponent {

  public width: string;

  @ViewChild('el', {
    read: ElementRef,
    static: true
  })
  public input: ElementRef;

}

describe('Description list adapter service', () => {
  let fixture: ComponentFixture<SkyActionButtonAdapterTestComponent>;
  let inputRef: ElementRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SkyActionButtonAdapterTestComponent
      ],
      providers: [
        SkyAcitonButtonAdapterService
      ]
    });

    fixture = TestBed.createComponent(SkyActionButtonAdapterTestComponent);
    fixture.detectChanges();
    inputRef = fixture.componentInstance.input;
  });

  it('should return widths', inject(
    [SkyActionButtonAdapterService],
    (adapter: SkyActionButtonAdapterService) => {
      fixture.componentInstance.width = '300px';
      fixture.detectChanges();
      expect(adapter.getWidth(inputRef)).toEqual(300);
    }
  ));

  it('should set responsive xs class when width is under 479px', inject(
    [SkyActionButtonAdapterService],
    (adapter: SkyActionButtonAdapterService) => {
      fixture.componentInstance.width = '479px';
      fixture.detectChanges();
      adapter.setResponsiveClass(inputRef);
      fixture.detectChanges();

      expect(inputRef.nativeElement).toHaveClass('sky-responsive-container-xs');
      expect(inputRef.nativeElement).not.toHaveClass('sky-responsive-container-sm');
      expect(inputRef.nativeElement).not.toHaveClass('sky-responsive-container-md');
    }
  ));

  it('should set responsive sm class when width is between 480px and 768px', inject(
    [SkyActionButtonAdapterService],
    (adapter: SkyActionButtonAdapterService) => {
      fixture.componentInstance.width = '480px';
      fixture.detectChanges();
      adapter.setResponsiveClass(inputRef);
      fixture.detectChanges();

      expect(inputRef.nativeElement).not.toHaveClass('sky-responsive-container-xs');
      expect(inputRef.nativeElement).toHaveClass('sky-responsive-container-sm');
      expect(inputRef.nativeElement).not.toHaveClass('sky-responsive-container-md');
    }
  ));

  it('should set responsive md class when width is 768px and above', inject(
    [SkyActionButtonAdapterService],
    (adapter: SkyActionButtonAdapterService) => {

      fixture.componentInstance.width = '768px';
      fixture.detectChanges();
      adapter.setResponsiveClass(inputRef);
      fixture.detectChanges();

      expect(inputRef.nativeElement).not.toHaveClass('sky-responsive-container-xs');
      expect(inputRef.nativeElement).not.toHaveClass('sky-responsive-container-sm');
      expect(inputRef.nativeElement).toHaveClass('sky-responsive-container-md');
    }
  ));

});

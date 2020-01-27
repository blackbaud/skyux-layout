import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  expect
} from '@skyux-sdk/testing';

import {
  FluidGridTestComponent
} from './fixtures/fluid-grid.component.fixture';

import {
  FluidGridTestModule
} from './fixtures/fluid-grid.module.fixture';

import {
  SkyFluidGridGutterSize
} from './fluid-grid-gutter-size';

// #region helpers
function getFluidGrid(fixture: ComponentFixture<any>): HTMLElement {
  return fixture.nativeElement.querySelector('.sky-fluid-grid') as HTMLElement;
}

function getRow(fixture: ComponentFixture<any>): HTMLElement {
  return fixture.nativeElement.querySelector('.sky-row') as HTMLElement;
}

function getColumn(fixture: ComponentFixture<any>): HTMLElement {
  return fixture.nativeElement.querySelector('.sky-column') as HTMLElement;
}
// #endregion

describe('SkyFluidGridComponent', () => {
  let component: FluidGridTestComponent;
  let fixture: ComponentFixture<FluidGridTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FluidGridTestModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluidGridTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('margin and paddings should default to 15px', () => {
    const fluidGrid = getFluidGrid(fixture);
    const row = getRow(fixture);
    const column = getColumn(fixture);

    expect(fluidGrid.style.padding).toEqual('0px 15px');
    expect(row.style.margin).toEqual('0px -15px');
    expect(column.style.padding).toEqual('0px 15px');
  });

  it('should change margins and paddings when gutterSize is updated', () => {
    component.gutterSize = SkyFluidGridGutterSize.Small;
    fixture.detectChanges();
    const fluidGrid = getFluidGrid(fixture);
    const row = getRow(fixture);
    const column = getColumn(fixture);

    expect(fluidGrid.style.padding).toEqual('0px 5px');
    expect(row.style.margin).toEqual('0px -5px');
    expect(column.style.padding).toEqual('0px 5px');
  });

  it('should double row margins when disableMargin is true', () => {
    component.disableMargin = true;
    fixture.detectChanges();
    const fluidGrid = getFluidGrid(fixture);
    const row = getRow(fixture);
    const column = getColumn(fixture);

    expect(fluidGrid.style.padding).toEqual('0px 15px');
    expect(row.style.margin).toEqual('0px -30px'); // Row should be double to compensate.
    expect(column.style.padding).toEqual('0px 15px');
  });
});

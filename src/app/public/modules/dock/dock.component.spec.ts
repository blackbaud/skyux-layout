import { TestBed } from '@angular/core/testing';
import { DockFixturesModule } from './fixtures/dock.module.fixture';
import { SkyDockService } from './dock.service';

describe('Dock component', () => {
  let service: SkyDockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DockFixturesModule
      ]
    });

    service = TestBed.get(SkyDockService);
  });

  it('should add an element to the dock', () => {

  });
});

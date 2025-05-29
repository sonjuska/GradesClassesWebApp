import { TestBed } from '@angular/core/testing';

import { OdeljenjaService } from './odeljenja.service';

describe('OdeljenjaService', () => {
  let service: OdeljenjaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OdeljenjaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

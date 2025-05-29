import { TestBed } from '@angular/core/testing';

import { StavkeSifrarnikaService } from './stavke-sifrarnika.service';

describe('StavkeSifrarnikaService', () => {
  let service: StavkeSifrarnikaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StavkeSifrarnikaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TransaccionesService } from './transacciones.service';

describe('TransaccionesServiceService', () => {
  let service: TransaccionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransaccionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

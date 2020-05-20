import { TestBed } from '@angular/core/testing';

import { CidadesService } from './cidades.service';

describe('CidadesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CidadesService = TestBed.get(CidadesService);
    expect(service).toBeTruthy();
  });
});

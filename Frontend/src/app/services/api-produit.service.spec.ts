import { TestBed } from '@angular/core/testing';

import { ApiProduitService } from './api-produit.service';

describe('ApiProduitService', () => {
  let service: ApiProduitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiProduitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

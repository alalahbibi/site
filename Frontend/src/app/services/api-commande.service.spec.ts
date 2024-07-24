import { TestBed } from '@angular/core/testing';

import { ApiCommandeService } from './api-commande.service';

describe('ApiCommandeService', () => {
  let service: ApiCommandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCommandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

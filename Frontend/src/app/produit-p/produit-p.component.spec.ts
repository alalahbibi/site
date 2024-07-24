import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitPComponent } from './produit-p.component';

describe('ProduitPComponent', () => {
  let component: ProduitPComponent;
  let fixture: ComponentFixture<ProduitPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

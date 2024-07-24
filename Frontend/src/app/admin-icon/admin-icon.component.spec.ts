import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIconComponent } from './admin-icon.component';

describe('AdminIconComponent', () => {
  let component: AdminIconComponent;
  let fixture: ComponentFixture<AdminIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandePComponent } from './commande-p.component';

describe('CommandePComponent', () => {
  let component: CommandePComponent;
  let fixture: ComponentFixture<CommandePComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandePComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandePComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

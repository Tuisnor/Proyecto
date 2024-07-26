import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasPrincipalComponent } from './citas-principal.component';

describe('CitasPrincipalComponent', () => {
  let component: CitasPrincipalComponent;
  let fixture: ComponentFixture<CitasPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CitasPrincipalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitasPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

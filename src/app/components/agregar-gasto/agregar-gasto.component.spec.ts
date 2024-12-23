import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarGastoComponent } from './agregar-gasto.component';

describe('AgregarGastoComponent', () => {
  let component: AgregarGastoComponent;
  let fixture: ComponentFixture<AgregarGastoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarGastoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

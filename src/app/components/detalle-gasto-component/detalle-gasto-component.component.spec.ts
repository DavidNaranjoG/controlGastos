import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleGastoComponentComponent } from './detalle-gasto-component.component';

describe('DetalleGastoComponentComponent', () => {
  let component: DetalleGastoComponentComponent;
  let fixture: ComponentFixture<DetalleGastoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleGastoComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleGastoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

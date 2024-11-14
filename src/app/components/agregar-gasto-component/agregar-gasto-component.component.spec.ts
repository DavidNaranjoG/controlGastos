import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarGastoComponentComponent } from './agregar-gasto-component.component';

describe('AgregarGastoComponentComponent', () => {
  let component: AgregarGastoComponentComponent;
  let fixture: ComponentFixture<AgregarGastoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarGastoComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarGastoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

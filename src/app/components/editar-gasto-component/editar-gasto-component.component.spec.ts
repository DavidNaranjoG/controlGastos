import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarGastoComponentComponent } from './editar-gasto-component.component';

describe('EditarGastoComponentComponent', () => {
  let component: EditarGastoComponentComponent;
  let fixture: ComponentFixture<EditarGastoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarGastoComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarGastoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

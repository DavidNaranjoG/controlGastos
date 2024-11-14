import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoGastosComponentComponent } from './listado-gastos-component.component';

describe('ListadoGastosComponentComponent', () => {
  let component: ListadoGastosComponentComponent;
  let fixture: ComponentFixture<ListadoGastosComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoGastosComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoGastosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

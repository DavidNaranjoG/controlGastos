import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TransaccionesService } from '../../services/transacciones.service';
import { CategoriasGastos } from '../../models/categoriasGastos';
import { Gasto } from '../../models/gastos';

@Component({
  selector: 'app-agregar-gasto',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-gasto.component.html',
  styleUrl: './agregar-gasto.component.css'
})
export class AgregarGastoComponent implements OnInit {anadirGastoForm!: FormGroup;
  gastoNuevo!: Gasto;
  categorias: CategoriasGastos[] = [];
  controlGastos: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private transaccionesService: TransaccionesService
  ) { }

  ngOnInit(): void {
    this.controlGastos = this.transaccionesService.getControlGastos();
    this.gastoNuevo = {
      id: 0, // ID temporal; se asignará en el servicio
      descripcion: '',
      monto: 0,
      categoria: { id: 0, nombre: '' },
      fecha: new Date(),
      total: 0
    };

    this.categorias = this.transaccionesService.getCategoriasGastos();

    this.anadirGastoForm = this.fb.group({
      descripcion: [, Validators.required],
      monto: [[Validators.required, Validators.min(0.01)]],
      categoria: [Validators.required],
      fecha: [
        // this.ingresoNuevo.fecha.toISOString().split('T')[0],
        Validators.required
      ],
    });
  }

  guardarNuevoGasto(): void {
    if (this.anadirGastoForm.valid) {
      const gastoNuevo: Gasto = {
        id: this.controlGastos.ingresos.length + 1, // Generar un ID único
        descripcion: this.anadirGastoForm.value.descripcion,
        monto: this.anadirGastoForm.value.monto,
        categoria: this.categorias.find(
          (c) => c.nombre === this.anadirGastoForm.value.categoria
        )!,
        fecha: new Date(this.anadirGastoForm.value.fecha),
        total: 0
      };

      this.transaccionesService.agregarGasto(gastoNuevo);
      this.router.navigate(['/listaGastos']);
    }
  }

  cancelar(): void {
    this.router.navigate(['/listaGastos']);
  }

  }

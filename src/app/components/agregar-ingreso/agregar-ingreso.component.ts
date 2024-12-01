import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriasIngresos } from '../../models/categoriasIngresos';
import { Ingreso } from '../../models/ingresos';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TransaccionesService } from '../../services/transacciones.service';

@Component({
  selector: 'app-agregar-ingreso',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-ingreso.component.html',
  styleUrls: ['./agregar-ingreso.component.css'] // Corregido el nombre del atributo
})
export class AgregarIngresoComponent implements OnInit {
  anadirIngresoForm!: FormGroup;
  ingresoId!: number;
  ingresoOriginal!: Ingreso;
  categorias: CategoriasIngresos[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private transaccionesService: TransaccionesService
  ) {}

  ngOnInit(): void {
    this.ingresoId = Number(this.route.snapshot.paramMap.get('id'));
    this.ingresoOriginal = this.transaccionesService
      .getControlGastos()
      .ingresos.find((g) => g.id === this.ingresoId)!;

    this.categorias = this.transaccionesService.getCategoriasIngresos();

    this.anadirIngresoForm = this.fb.group({
      descripcion: [this.ingresoOriginal.descripcion, Validators.required],
      monto: [this.ingresoOriginal.monto, [Validators.required, Validators.min(0.01)]],
      categoria: [this.ingresoOriginal.categoria.id, Validators.required],
      fecha: [
        this.ingresoOriginal.fecha.toISOString().split('T')[0],
        Validators.required,
      ],
    });
  }

  guardarNuevoIngreso(): void {
    if (this.anadirIngresoForm.valid) {
      const ingresoActualizado: Ingreso = {
        ...this.ingresoOriginal,
        descripcion: this.anadirIngresoForm.value.descripcion,
        monto: this.anadirIngresoForm.value.monto,
        categoria: this.categorias.find(
          (c) => c.id === Number(this.anadirIngresoForm.value.categoria)
        )!,
        fecha: new Date(this.anadirIngresoForm.value.fecha),
      };

      this.transaccionesService.actualizarIngreso(this.ingresoId, ingresoActualizado);
      this.router.navigate(['/listaIngresos']);
    }
  }

  cancelar(): void {
    this.router.navigate(['/listaIngresos']);
  }
}

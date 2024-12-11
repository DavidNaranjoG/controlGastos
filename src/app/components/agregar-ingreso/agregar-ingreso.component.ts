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
  ingresoNuevo!: Ingreso;
  categorias: CategoriasIngresos[] = [];
  controlGastos: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private transaccionesService: TransaccionesService
  ) { }

  ngOnInit(): void {
    this.controlGastos = this.transaccionesService.getControlGastos();
    this.ingresoNuevo = {
      id: 0, // ID temporal; se asignará en el servicio
      descripcion: '',
      monto: 0,
      categoria: { id: 0, nombre: '' },
      fecha: new Date(),
      total: 0
    };

    this.categorias = this.transaccionesService.getCategoriasIngresos();

    this.anadirIngresoForm = this.fb.group({
      descripcion: [, Validators.required],
      monto: [[Validators.required, Validators.min(0.01)]],
      categoria: [Validators.required],
      fecha: [
        // this.ingresoNuevo.fecha.toISOString().split('T')[0],
        Validators.required
      ],
    });
   
  }

  guardarNuevoIngreso(): void {
    if (this.anadirIngresoForm.valid) {
      const ingresoNuevo: Ingreso = {
        id: this.controlGastos.ingresos.length + 1, // Generar un ID único
        descripcion: this.anadirIngresoForm.value.descripcion,
        monto: this.anadirIngresoForm.value.monto,
        categoria: this.categorias.find(
          (c) => c.nombre === this.anadirIngresoForm.value.categoria
        )!,
        fecha: new Date(this.anadirIngresoForm.value.fecha),
        total: 0
      };

      this.transaccionesService.agregarIngreso(ingresoNuevo);
      this.router.navigate(['/listaIngresos']);
    }
  }

  cancelar(): void {
    this.router.navigate(['/listaIngresos']);
  }
}

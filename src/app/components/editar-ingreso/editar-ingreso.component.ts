import { Component, OnInit } from '@angular/core';
import { TransaccionesService } from '../../services/transacciones.service';
import { Gasto } from '../../models/gastos';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriasIngresos } from '../../models/categoriasIngresos';
import { Ingreso } from '../../models/ingresos';

@Component({
  selector: 'app-editar-ingreso',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './editar-ingreso.component.html',
  styleUrl: './editar-ingreso.component.css'
})
export class EditarIngresoComponent implements OnInit {
  ingresoForm!: FormGroup;
  ingresoId!: number;
  ingresoOriginal!: Ingreso;
  categorias: CategoriasIngresos[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private transaccionesService: TransaccionesService
  ) { }

  ngOnInit(): void {
    // Obtener el ID del gasto desde la ruta
    this.ingresoId = Number(this.route.snapshot.paramMap.get('id'));

    // Cargar el gasto original
    this.ingresoOriginal = this.transaccionesService.getControlGastos().ingresos.find(g => g.id === this.ingresoId)!;

    // Inicializar el formulario con los datos del gasto
    this.ingresoForm = this.fb.group({
      descripcion: [this.ingresoOriginal.descripcion, Validators.required],
      monto: [this.ingresoOriginal.monto, [Validators.required, Validators.min(1)]],
      categoria: [this.ingresoOriginal.categoria.nombre, Validators.required], // Usar el id de la categoría
      fecha: [this.ingresoOriginal.fecha.toISOString().split('T')[0], Validators.required] // Convertimos la fecha a YYYY-MM-DD
    });
    // Obtener las categorías
    this.categorias = this.transaccionesService.getCategoriasIngresos();
  }

  guardarCambios(): void {
    if (this.ingresoForm.valid) {
      const fechaString = this.ingresoForm.value.fecha; // Ejemplo: "30/11/2024"
      const [dia, mes, anio] = fechaString.split('-').map(Number);
      const ingresoActualizado: Ingreso = {
        ...this.ingresoOriginal,
        descripcion: this.ingresoForm.value.descripcion,
        monto: this.ingresoForm.value.monto,
        categoria: {
          id: this.ingresoOriginal.categoria.id,
          nombre: this.ingresoForm.value.categoria
        },
        fecha: new Date(dia, mes-1, anio)

      };

      // Actualizar el gasto en el servicio
      this.transaccionesService.actualizarIngreso(this.ingresoId, ingresoActualizado);

      // Redirigir a la lista de gastos
      this.router.navigate(['/listaIngresos']);
    }
  }

  cancelar(): void {
    this.router.navigate(['/listaIngresos']);
  }


}

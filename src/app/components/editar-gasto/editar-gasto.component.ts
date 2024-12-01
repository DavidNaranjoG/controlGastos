import { Component, OnInit } from '@angular/core';
import { TransaccionesService } from '../../services/transacciones.service';
import { Gasto } from '../../models/gastos';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriasGastos } from '../../models/categoriasGastos';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'editarGasto',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './editar-gasto.component.html',
  styleUrl: './editar-gasto.component.css'
})
export class EditarGastoComponent implements OnInit {
 
  gastoForm!: FormGroup;
  gastoId!: number;
  gastoOriginal!: Gasto;
  categorias: CategoriasGastos[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private transaccionesService: TransaccionesService
  ) {}

  ngOnInit(): void {
    // Obtener el ID del gasto desde la ruta
    this.gastoId = Number(this.route.snapshot.paramMap.get('id'));

    // Cargar el gasto original
    this.gastoOriginal = this.transaccionesService.getControlGastos().gastos.find(g => g.id === this.gastoId)!;

    // Inicializar el formulario con los datos del gasto
    this.gastoForm = this.fb.group({
      descripcion: [this.gastoOriginal.descripcion, Validators.required],
      monto: [this.gastoOriginal.monto, [Validators.required, Validators.min(1)]],
      categoria: [this.gastoOriginal.categoria.nombre, Validators.required], // Usar el id de la categoría
      fecha: [this.gastoOriginal.fecha.toISOString().split('T')[0], Validators.required] // Convertimos la fecha a YYYY-MM-DD
    });
     // Obtener las categorías
     this.categorias = this.transaccionesService.getCategoriasGastos();
     console.log(this.categorias);
  }

  guardarCambios(): void {
    if (this.gastoForm.valid) {
      const fechaString = this.gastoForm.value.fecha; // Ejemplo: "30/11/2024"
      const [dia, mes, anio] = fechaString.split('-').map(Number);
      const gastoActualizado: Gasto = {
        ...this.gastoOriginal,
        descripcion: this.gastoForm.value.descripcion,
        monto: this.gastoForm.value.monto,
        categoria: {
          id: this.gastoOriginal.categoria.id,
          nombre: this.gastoForm.value.categoria
        },
        fecha: new Date(dia, mes-1, anio)
      };

      // Actualizar el gasto en el servicio
      this.transaccionesService.actualizarGasto(this.gastoId, gastoActualizado);

      // Redirigir a la lista de gastos
      this.router.navigate(['/']);
    }
  }

  cancelar(): void {
    this.router.navigate(['/']);
  }

}

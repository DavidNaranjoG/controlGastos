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
export class AgregarGastoComponent implements OnInit {

  anadirGastoForm!: FormGroup;
  gastoId!: number;
  gastoOriginal!: Gasto;
  categorias: CategoriasGastos[]=[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private transaccionesService: TransaccionesService
  ){}

  ngOnInit(): void {
    // Obtener el ID del gasto desde la ruta
    this.gastoId = Number(this.route.snapshot.paramMap.get('id'));

    // Cargar el gasto original
    this.gastoOriginal = this.transaccionesService.getControlGastos().gastos.find(g => g.id === this.gastoId)!;

    // Inicializar el formulario con los datos del gasto
    this.anadirGastoForm = this.fb.group({
      descripcion: [],
      monto: [],
      categoria: [], // Usar el id de la categoría
      fecha: [] // Convertimos la fecha a YYYY-MM-DD
    });
    // Obtener las categorías
    this.categorias = this.transaccionesService.getCategoriasIngresos();
  }

  guardarNuevoGasto(){
    if (this.anadirGastoForm.valid) {
      const fechaString = this.anadirGastoForm.value.fecha; // Ejemplo: "30/11/2024"
      const [dia, mes, anio] = fechaString.split('-').map(Number);
      const gastoActualizado: Gasto = {
        ...this.anadirGastoForm,
        descripcion: this.anadirGastoForm.value.descripcion,
        monto: this.anadirGastoForm.value.monto,
        categoria: {
          id: this.gastoOriginal.categoria.id,
          nombre: this.anadirGastoForm.value.categoria
        },
        fecha: new Date(dia, mes - 1, anio),
        id: 0,
        total: 0
      };

      // Actualizar el gasto en el servicio
      this.transaccionesService.actualizarIngreso(this.gastoId, gastoActualizado);

      // Redirigir a la lista de gastos
      this.router.navigate(['/listaGastos']);
    }
  }
  cancelar(): void {
    this.router.navigate(['/listaGastos']);
  }

  }

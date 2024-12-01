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
  styleUrl: './agregar-ingreso.component.css'
})
export class AgregarIngresoComponent implements OnInit {
  anadirIngresoForm!: FormGroup;
  ingresoId!: number;
  ingresoOriginal!: Ingreso;
  categorias: CategoriasIngresos[] = [];
  
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private transaccionesService: TransaccionesService
  ){}
  ngOnInit(): void {
    // Obtener el ID del gasto desde la ruta
    this.ingresoId = Number(this.route.snapshot.paramMap.get('id'));

    // Cargar el gasto original
    this.ingresoOriginal = this.transaccionesService.getControlGastos().ingresos.find(g => g.id === this.ingresoId)!;

    // Inicializar el formulario con los datos del gasto
    this.anadirIngresoForm = this.fb.group({
      descripcion: [],
      monto: [],
      categoria: [], // Usar el id de la categoría
      fecha: [] // Convertimos la fecha a YYYY-MM-DD
    });
    // Obtener las categorías
    this.categorias = this.transaccionesService.getCategoriasIngresos();

  }


  guardarNuevoIngreso(): void{
      if (this.anadirIngresoForm.valid) {
        const fechaString = this.anadirIngresoForm.value.fecha; // Ejemplo: "30/11/2024"
        const [dia, mes, anio] = fechaString.split('-').map(Number);
        const ingresoActualizado: Ingreso = {
          ...this.ingresoOriginal,
          descripcion: this.anadirIngresoForm.value.descripcion,
          monto: this.anadirIngresoForm.value.monto,
          categoria: {
            id: this.ingresoOriginal.categoria.id,
            nombre: this.anadirIngresoForm.value.categoria
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

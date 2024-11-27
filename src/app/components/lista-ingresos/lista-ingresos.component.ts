import { Component, OnInit } from '@angular/core';
import { TransaccionesService } from '../../services/transacciones.service';
import { CommonModule } from '@angular/common';
import { Ingreso } from '../../models/ingresos';

@Component({
  selector: 'listaIngresos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-ingresos.component.html',
  styleUrl: './lista-ingresos.component.css'
})
export class ListaIngresosComponent implements OnInit {
  ingresoPorDia: { [key: string]: any[] } = {};
  totalIngresos: number = 0;

  fechaInicio: Date;
  fechaFin: Date;

  ingresos: Ingreso[] = [];
  id: number = 0;

  constructor(private transaccionesService: TransaccionesService) {
    // Inicializamos con el rango actual (semana por defecto)
    const hoy = new Date();
    this.fechaFin = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    this.fechaInicio = new Date(
      hoy.getFullYear(),
      hoy.getMonth(),
      hoy.getDate() - 6 // Semana actual
    );
  }

  ngOnInit(): void {
    this.obtenerIngresos();
    this.cargarIngresos();
  }


  cargarIngresos(): void {
    const controlGastos = this.transaccionesService.getControlGastos();
    this.ingresos = controlGastos.ingresos;
  }

  eliminarIngreso(id: number): void {
    const resultado = this.transaccionesService.eliminarIngreso(id);
    this.ingresos = resultado.ingresos;
    console.log(`Ingreso con id ${id} eliminado.`);
    // Actualizar la vista
    this.obtenerIngresos();
  }


  // Método para actualizar los datos según el rango de fechas
  obtenerIngresos(): void {
    this.ingresoPorDia = this.transaccionesService.organizarIngresosPorDia(this.fechaInicio, this.fechaFin);
    this.totalIngresos = this.transaccionesService.getTotalIngresosPorRango(this.fechaInicio, this.fechaFin);
  }

  // Cambiar rango: día, semana, mes
  cambiarRango(opcion: string): void {
    const hoy = new Date();
    if (opcion === 'día') {
      this.fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
      this.fechaFin = this.fechaInicio;
    } else if (opcion === 'semana') {
      this.fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 6);
      this.fechaFin = hoy;
    } else if (opcion === 'mes') {
      this.fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
      this.fechaFin = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
    }
    this.obtenerIngresos(); // Actualizar datos
  }

}

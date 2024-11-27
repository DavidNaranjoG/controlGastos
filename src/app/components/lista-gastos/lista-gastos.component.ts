import { Component, OnInit } from '@angular/core';
import { TransaccionesService } from '../../services/transacciones.service';
import { CommonModule } from '@angular/common';
import { Gasto } from '../../models/gastos';

@Component({
  selector: 'listaGastos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-gastos.component.html',
  styleUrl: './lista-gastos.component.css'
})
export class ListaGastosComponent implements OnInit {
  gastosPorDia: { [key: string]: any[] } = {};
  totalGastos: number = 0;

  fechaInicio: Date;
  fechaFin: Date;

  gastos: Gasto[] = [];
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
    this.obtenerGastos();
  }

  cargarGasto(): void {
    const controlGastos = this.transaccionesService.getControlGastos();
    this.gastos = controlGastos.gastos;
  }

  eliminarGasto(id: number): void {
    const resultado = this.transaccionesService.eliminarGasto(id);
    this.gastos = resultado.ingresos;
    console.log(`Gasto con id ${id} eliminado.`);
    // Actualizar la vista
    this.obtenerGastos();
  }
  // Método para actualizar los datos según el rango de fechas
  obtenerGastos(): void {
    this.gastosPorDia = this.transaccionesService.organizarGastosPorDia(this.fechaInicio, this.fechaFin);
    this.totalGastos = this.transaccionesService.getTotalGastosPorRango(this.fechaInicio, this.fechaFin);
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
    this.obtenerGastos(); // Actualizar datos
  }

}

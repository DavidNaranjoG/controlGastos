import { Component, OnInit } from '@angular/core';
import { TransaccionesService } from '../../services/transacciones.service';
import { CommonModule } from '@angular/common';
import { Ingreso } from '../../models/ingresos';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'listaIngresos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-ingresos.component.html',
  styleUrl: './lista-ingresos.component.css'
})
export class ListaIngresosComponent implements OnInit {
  ingresoPorDia: { [key: string]: any[] } = {};
  totalIngresos: number = 0;

  hoy!: Date;
  fechaInicio: Date;
  fechaFin: Date;
  

  ingresos: Ingreso[] = [];
  id: number = 0;
  balance: number = 0;
  constructor(
    private transaccionesService: TransaccionesService, private router: Router
  ) {
    // Inicializamos con el rango actual (semana por defecto)
    this.hoy = this.transaccionesService.truncarHora(new Date());
    this.fechaFin = this.transaccionesService.truncarHora(new Date(this.hoy.getFullYear(), this.hoy.getMonth() +1, this.hoy.getDate()));
    this.fechaInicio = new Date(
      this.hoy.getFullYear(),
      this.hoy.getMonth(),
      this.hoy.getDate() - 6 // Semana actual
    );
  }

  ngOnInit(): void {
    this.obtenerIngresos();
    this.cargarIngresos();
    this.getBalance();
  }

  getBalance(){
    this.balance = this.transaccionesService.getBalance();
    return this.balance
  }

  cargarIngresos(): void {
    const controlGastos = this.transaccionesService.getControlGastos();
    this.ingresos = controlGastos.ingresos;
  }

  eliminarIngreso(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este gasto?')) {
      const resultado = this.transaccionesService.eliminarIngreso(id);
      this.ingresos = resultado.ingresos;
      console.log(`Ingreso con id ${id} eliminado.`);
      // Actualizar la vista
      this.obtenerIngresos();
      this.getBalance();
    }

  }


  // Método para actualizar los datos según el rango de fechas
  obtenerIngresos(): void {
    this.ingresoPorDia = this.transaccionesService.organizarIngresosPorDia(this.fechaInicio, this.fechaFin);
    this.totalIngresos = this.transaccionesService.getTotalIngresosPorRango(this.fechaInicio, this.fechaFin);
  }

  // Cambiar rango: día, semana, mes
  cambiarRango(opcion: string): void {
    const hoy = this.hoy;
    if (opcion === 'día') {
      this.fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
      this.fechaFin = this.transaccionesService.truncarHora(new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate()));
    } else if (opcion === 'semana') {
      this.fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 6);
      this.fechaFin = hoy;
    } else if (opcion === 'mes') {
      this.fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
      this.fechaFin = this.transaccionesService.truncarHora(new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0));
    }
    this.obtenerIngresos(); // Actualizar datos
  }

  anadirIngreso(): void{
    this.router.navigate(['/agregarIngreso'])
  }

  verGastos(): void {
    this.router.navigate(['/listaGastos'])
  }
}

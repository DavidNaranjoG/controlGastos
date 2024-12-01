import { Component, OnInit } from '@angular/core';
import { TransaccionesService } from '../../services/transacciones.service';
import { CommonModule } from '@angular/common';
import { Gasto } from '../../models/gastos';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'listaGastos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-gastos.component.html',
  styleUrl: './lista-gastos.component.css'
})
export class ListaGastosComponent implements OnInit {
  gastosPorDia: { [key: string]: any[] } = {};
  totalGastos: number = 0;

  hoy !: Date;
  fechaInicio: Date;
  fechaFin: Date;

  gastos: Gasto[] = [];
  id: number = 0;
  balance: number = 0;

  constructor(private transaccionesService: TransaccionesService, private router: Router) {
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
    this.obtenerGastos();
    this.cargarGasto();
    this.getBalance();
    // this.getControlGastos()
  }
  // getControlGastos() {
  //   return this.transaccionesService.getControlGastos();
    
  // }
  

  getBalance(){
    this.balance = this.transaccionesService.getBalance();
    return this.balance
    
  }

  cargarGasto(): void {
    const controlGastos = this.transaccionesService.getControlGastos();
    this.gastos = controlGastos.gastos;
  }

  eliminarGasto(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este gasto?')) {
      const resultado = this.transaccionesService.eliminarGasto(id);
      this.gastos = resultado.gastos;
      console.log(`Gasto con id ${id} eliminado.`);
      // Actualizar la vista
      this.obtenerGastos();
      this.getBalance();
    }

  }
  // Método para actualizar los datos según el rango de fechas
  obtenerGastos(): void {
    this.gastosPorDia = this.transaccionesService.organizarGastosPorDia(this.fechaInicio, this.fechaFin);
    this.totalGastos = this.transaccionesService.getTotalGastosPorRango(this.fechaInicio, this.fechaFin);
  }

  // Cambiar rango: día, semana, mes
  cambiarRango(opcion: string): void {
    const hoy = this.hoy
    if (opcion === 'día') {
      this.fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
      this.fechaFin = this.fechaInicio;
    } else if (opcion === 'semana') {
      this.fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 6);
      this.fechaFin = hoy;
    } else if (opcion === 'mes') {
      this.fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
      this.fechaFin = this.transaccionesService.truncarHora(new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0));
    }
    this.obtenerGastos(); // Actualizar datos
  }
  anadirIngreso(): void{
    this.router.navigate(['/agregarGasto'])
  }

  verIngresos(): void {
    this.router.navigate(['/listaIngresos'])
  }

}

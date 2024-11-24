import { Injectable } from '@angular/core';
import { controlGastosData } from '../data/controlGastosData';
import { ControlGastos } from '../models/controlGastos';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  private controlGastos: ControlGastos = controlGastosData;

  constructor() { }


  // Metodo para obtener la informacion de los gastos e ingresos 
  getControlGastos(): ControlGastos {
    const balance = this.getBalance();
    return { ...this.controlGastos, balance }
  }


  // Metodo para eliminar un ingreso 
  eliminarIngreso(id: number): ControlGastos {
    this.controlGastos.ingresos = this.controlGastos.ingresos.filter(ingreso => ingreso.id != id);
    const balance = this.getBalance();
    return { ...this.controlGastos, balance };
  }

// Metodo para eliminar un gasto en especifico
  eliminarGasto(id: number): ControlGastos {
    this.controlGastos.gastos = this.controlGastos.gastos.filter(gasto => gasto.id != id);
    const balance = this.getBalance();
    return { ...this.controlGastos, balance };
  }


  // Metodo para obtener el total de los ingresos 
  getTotalIngresos(): number {
    return this.controlGastos.ingresos.reduce((total, ingreso) => total + (ingreso.monto), 0)
  }


  // Metodo para obtener el total de gastos
  getTotalGastos(): number{
    return this.controlGastos.gastos.reduce((total, gasto) => total + (gasto.monto), 0)
  }


  // Metodo para obtener el balance general
  getBalance(): number {
    return this.getTotalIngresos() - this.getTotalGastos(); 
    }
}

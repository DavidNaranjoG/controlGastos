import { Injectable } from '@angular/core';
import { controlGastosData } from '../data/controlGastosData';
import { ControlGastos } from '../models/controlGastos';
import { Gasto } from '../models/gastos';
import { Ingreso } from '../models/ingresos';
import { CategoriasGastos } from '../models/categoriasGastos';
import { categoriasGastosData } from '../data/categoriasGastosData';
import { CategoriasIngresos } from '../models/categoriasIngresos';
import { categoriasIngresosData } from '../data/categoriasIngresosData';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  private categoriasGasto: CategoriasGastos[] = categoriasGastosData;
  private categoriasIngreso: CategoriasIngresos[] = categoriasIngresosData

  private controlGastos: ControlGastos = controlGastosData;
  

  constructor() {
    console.log("ests es el objeto creado: ", this.controlGastos)
   }


  // Metodo para obtener la informacion de los gastos e ingresos 
  getControlGastos(): ControlGastos {
    const balance = this.getBalance();
    return { ...this.controlGastos, balance }
  }
  


  // Verifica si una fecha está en un rango dado
  private estaEnRango(fecha: Date, fechaInicio: Date, fechaFin: Date): boolean {
    return fecha >= fechaInicio && fecha <= fechaFin;
  }

  // Metodo para eliminar un ingreso 
  eliminarIngreso(id: number): ControlGastos {
    if (!this.controlGastos.ingresos.some(ingreso => ingreso.id === id)) {
      console.warn(`Ingreso con id ${id} no encontrado.`);
    }
    this.controlGastos.ingresos = this.controlGastos.ingresos.filter(ingreso => ingreso.id != id);
    const balance = this.getBalance();
    return { ...this.controlGastos, balance };
  }

  // Metodo para eliminar un gasto en especifico
  eliminarGasto(id: number): ControlGastos {
    if (!this.controlGastos.gastos.some(gasto => gasto.id === id)) {
      console.warn(`Gasto con id ${id} no encontrado.`);
    }
    this.controlGastos.gastos = this.controlGastos.gastos.filter(gasto => gasto.id != id);
    const balance = this.getBalance();
    return { ...this.controlGastos, balance };
  }

  // Filtra y organiza los ingresos en un rango de fechas
  getIngresosPorRango(fechaInicio: Date, fechaFin: Date): Ingreso[] {
    return this.controlGastos.ingresos.filter((ingreso: Ingreso) =>
      this.estaEnRango(new Date(ingreso.fecha), fechaInicio, fechaFin)
    );
  }

  // Filtra y organiza los gastos en un rango de fechas
  getGastosPorRango(fechaInicio: Date, fechaFin: Date): Gasto[] {
    return this.controlGastos.gastos.filter((gasto: Gasto) =>
      this.estaEnRango(new Date(gasto.fecha), fechaInicio, fechaFin)
    );
  }
  

  // Calcula el total de ingresos en un rango de fechas
  getTotalIngresosPorRango(fechaInicio: Date, fechaFin: Date): number {
    const ingresos = this.getIngresosPorRango(fechaInicio, fechaFin);
    console.log("ingresos por rango: ", ingresos)
    return ingresos.reduce((sum, ingreso) => sum + ingreso.monto, 0);
  }

  // Calcula el total de gastos en un rango de fechas
  getTotalGastosPorRango(fechaInicio: Date, fechaFin: Date): number {
    const gastos = this.getGastosPorRango(fechaInicio, fechaFin);
    return gastos.reduce((sum, gasto) => sum + gasto.monto, 0);
  }


  // Organiza los gastos por día dentro de un rango
  organizarGastosPorDia(fechaInicio: Date, fechaFin: Date): { [key: string]: Gasto[] } {
    const gastos = this.getGastosPorRango(fechaInicio, fechaFin);
    return gastos.reduce((acumulador: { [key: string]: Gasto[] }, gasto) => {
      const dia = new Date(gasto.fecha).toISOString().split('T')[0]; // YYYY-MM-DD
      acumulador[dia] = acumulador[dia] || [];
      acumulador[dia].push(gasto);
      return acumulador;
    }, {});
  }

  // Organiza los ingresos por día dentro de un rango

  truncarHora(fecha: Date): Date {
    const truncada = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
    truncada.setHours(23, 59, 59, 999); // Establecer la hora a las 23:59:59.999
    return truncada;
  }
  

  organizarIngresosPorDia(fechaInicio: Date, fechaFin: Date): { [key: string]: Ingreso[] } {
    const ingresos = this.getIngresosPorRango(fechaInicio, fechaFin);
    return ingresos.reduce((acumulador: { [key: string]: Ingreso[] }, ingreso) => {
      const dia = new Date(ingreso.fecha).toISOString().split('T')[0]; // YYYY-MM-DD
      acumulador[dia] = acumulador[dia] || [];
      acumulador[dia].push(ingreso);
      return acumulador;
      
    }, {});
  }

  // Metodo para obtener el total de los ingresos 
  getTotalIngresos(): number {
    return this.controlGastos.ingresos.reduce((total, ingreso) => total + (ingreso.monto), 0)
  }


  // Metodo para obtener el total de gastos
  getTotalGastos(): number {
    return this.controlGastos.gastos.reduce((total, gasto) => total + (gasto.monto), 0)
  }


  // Metodo para obtener el balance general
  getBalance(): number {
    return this.getTotalIngresos() - this.getTotalGastos();
  }

//Metodo para actualizar un Gasto
  actualizarGasto(id: number, gastoActualizado: Gasto): void {
    // Verificar que la fecha no sea mayor a la fecha de hoy
    const fechaHoy = new Date();
    const fechaSeleccionada = new Date(gastoActualizado.fecha);

    if (fechaSeleccionada > fechaHoy) {
      alert('No puedes seleccionar una fecha mayor a la de hoy.');
      return;
    }
    const index = this.controlGastos.gastos.findIndex(g => g.id === id);
    if (index !== -1) {
      this.controlGastos.gastos[index] = gastoActualizado;
    } else {
      console.warn(`Gasto con ID ${id} no encontrado para actualizar.`);
    }
  }


  // Obtener las categorías de gastos
  getCategoriasGastos(): CategoriasGastos[] {
    return this.categoriasGasto
  }


//Metodo para actualizar un ingreso
  actualizarIngreso(id: number, ingresoActualizado: Ingreso): void {
    // Verificar que la fecha no sea mayor a la fecha de hoy
    const fechaHoy = new Date();
    const fechaSeleccionada = new Date(ingresoActualizado.fecha);

    if (fechaSeleccionada > fechaHoy) {
      alert('No puedes seleccionar una fecha mayor a la de hoy.');
      return;
    }
    const index = this.controlGastos.ingresos.findIndex(i => i.id === id);
    if (index !== -1) {
      this.controlGastos.ingresos[index] = ingresoActualizado;
    } else {
      console.warn(`Gasto con ID ${id} no encontrado para actualizar.`);
    }
  }


  // Obtener las categorías de Ingresos
  getCategoriasIngresos(): CategoriasIngresos[] {
    return this.categoriasIngreso
  }
}

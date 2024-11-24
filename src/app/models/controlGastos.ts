import { Gasto } from "./gastos";
import { Ingreso } from "./ingresos";

export interface ControlGastos {
    ingresos: Ingreso[],
    gastos: Gasto[],
    balance: number
}
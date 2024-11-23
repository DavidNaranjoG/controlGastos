import { CategoriasGastos } from "./categoriasGastos";

export interface Gasto {
    id: number;
    descripcion: string;
    monto: number;
    categoria: CategoriasGastos;
    fecha: Date;
}

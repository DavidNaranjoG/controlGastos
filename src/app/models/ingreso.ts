import { CategoriasIngresos } from "./categoriasIngresos";

export interface Ingreso {
    id: number;
    descripcion: string;
    monto: number;
    categoria: CategoriasIngresos;
    fecha: Date;
}


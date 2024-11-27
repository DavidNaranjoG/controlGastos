export const controlGastosData: any = {
    ingresos: [
        {
            id: 1,
            descripcion: "Ingreso por nomina",
            monto: 2500000,
            categoria: {
                id: 1,
                nombre: "Salario"
            },
            fecha: new Date("2024-11-15")
        },
        {
            id: 2,
            descripcion: "Ganancias inversion",
            monto: 500000,
            categoria: {
                id: 2,
                nombre: "Inversion"
            },
            fecha: new Date("2024-11-20")
        }
    ],
    gastos: [
        {
            id: 1,
            descripcion: "Arriendo",
            monto: 1000000,
            categoria: {
                id: 1,
                nombre: "casa"
            },
            fecha: new Date("2024-11-15")
        },
        {
            id: 2,
            descripcion: "Mercado mensual",
            monto: 500000,
            categoria: {
                id: 1,
                nombre: "casa"
            },
            fecha: new Date("2024-11-20")
        }
    ],
}
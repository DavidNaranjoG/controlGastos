import { RouterModule, Routes } from '@angular/router';
import { EditarGastoComponent } from './components/editar-gasto/editar-gasto.component';
import { NgModule } from '@angular/core';
import { ListaGastosComponent } from './components/lista-gastos/lista-gastos.component';
import { ListaIngresosComponent } from './components/lista-ingresos/lista-ingresos.component';
import { AppComponent } from './app.component';
import { EditarIngresoComponent } from './components/editar-ingreso/editar-ingreso.component';

export const routes: Routes = [
    { path: '', component: ListaIngresosComponent }, // Ruta predeterminada para mostrar la lista
    { path: 'editarGasto/:id', component: EditarGastoComponent },
    { path: 'editarIngreso/:id', component: EditarIngresoComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
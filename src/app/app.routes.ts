import { RouterModule, Routes } from '@angular/router';
import { EditarGastoComponent } from './components/editar-gasto/editar-gasto.component';
import { NgModule } from '@angular/core';
import { ListaGastosComponent } from './components/lista-gastos/lista-gastos.component';
import { ListaIngresosComponent } from './components/lista-ingresos/lista-ingresos.component';
import { AppComponent } from './app.component';
import { EditarIngresoComponent } from './components/editar-ingreso/editar-ingreso.component';
import { AgregarIngresoComponent } from './components/agregar-ingreso/agregar-ingreso.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AgregarGastoComponent } from './components/agregar-gasto/agregar-gasto.component';

export const routes: Routes = [
    { path: '', component: InicioComponent},
    { path: 'agregarIngreso', component: AgregarIngresoComponent }, // Ruta predeterminada para mostrar la lista
    { path: 'agregarGasto', component: AgregarGastoComponent }, // Ruta predeterminada para mostrar la lista
    { path: 'editarGasto/:id', component: EditarGastoComponent },
    { path: 'editarIngreso/:id', component: EditarIngresoComponent },
    { path: 'listaGastos', component: ListaGastosComponent },
    { path: 'listaIngresos', component: ListaIngresosComponent },
    { path: 'login', component: LoginComponent},
    { path: 'registro', component: RegistroComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
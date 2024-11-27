import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from "./components/registro/registro.component";
import { ListaGastosComponent } from './components/lista-gastos/lista-gastos.component';
import { ListaIngresosComponent } from './components/lista-ingresos/lista-ingresos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, RegistroComponent, ListaGastosComponent, ListaIngresosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'controlGastos';
}

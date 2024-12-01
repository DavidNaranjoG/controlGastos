import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  login: any = {
    email: '',
    contraseña: ''
  }

  constructor(private router: Router){}

  volverInicio(): void{
    this.router.navigate(['/'])
  }

  verListaIngresos(): void {
    this.router.navigate(['/listaIngresos'])
  }
}

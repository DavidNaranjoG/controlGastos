import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  
  constructor(private router: Router) { }

  registro: any = {
    nombre: '',
    apellido: '',
    email: '',
    contraseña: '',
    password2: '' // Añadir el campo para repetir la contraseña
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit(form: any): void {
    if (form.valid) {
      // Aquí se puede llamar al backend para registrar al usuario
      console.log(this.registro);
      this.router.navigate(['/login']); // Redirige al login tras el registro
    } else {
      console.log('Formulario inválido');
    }
  }

  volverInicio(): void {
    this.router.navigate(['/']);
  }

  verLogin(): void {
    this.router.navigate(['/login']);
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  registro: any = {
    nombre: '',
    apellido: '',
    email: '',
    contraseña: ''
  }

}

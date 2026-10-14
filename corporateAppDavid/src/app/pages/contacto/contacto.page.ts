import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonItem, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonButton]
})
export class ContactoPage implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  correo = '';
  mensaje = '';

  enviar() {
    console.log('Correo:', this.correo);
    console.log('Mensaje:', this.mensaje);
    this.correo = '';
    this.mensaje = '';
  }
}
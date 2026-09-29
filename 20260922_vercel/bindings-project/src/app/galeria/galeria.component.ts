import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonSpinner, IonTitle, IonToolbar } from '@ionic/angular';
import { Usuario } from '../usuario';
import { Servicio } from '../servicio';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonItem],
})
export class GaleriaComponent  implements OnInit {

  public tituloSeccion:string = 'Galeria de Imagenes Dinámica';
  public descripcion:string = 'Esta imagen se carga desde el directorio de assets Property Binding.';
  public rutaImagenLocal:string = 'assets/foto1.jpg';

  users:Usuario[]=[]
  constructor(private usersService:Servicio) { }

  async ngOnInit() {
    this.users = await this.usersService.getUsuarios();
    console.log("prueba");
  }

}

import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonRow, IonGrid, IonCol } from '@ionic/angular';
import { Columna, TablaDatosComponent } from '../../components/tabla-datos/tabla-datos.component';
import { WidgetEstadisticoComponent } from '../../components/widget-estadistico/widget-estadistico.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton,
    TablaDatosComponent, WidgetEstadisticoComponent,
    IonRow,
    IonGrid,
    IonCol
],
})
export class InicioPage {
  columnas: Columna[] = [
    { campo: 'titulo', titulo: 'Recurso' },
    { campo: 'categoria', titulo: 'Categoría' },
    { campo: 'precio', titulo: 'Precio (€)' },
  ];

  // Datos de ejemplo; en la Fase 3 vendrán de un servicio
  recursos = [
    { titulo: 'Temario Derecho Constitucional', categoria: 'Administrativo', precio: 19.9 },
    { titulo: 'Test Derecho Administrativo', categoria: 'Administrativo', precio: 9.9 },
    { titulo: 'Supuestos prácticos Contabilidad', categoria: 'Auxiliar', precio: 14.5 },
    { titulo: 'Esquemas Ley 39/2015', categoria: 'Administrativo', precio: 7.5 },
  ];

  precioMedio = (this.recursos.reduce((s, r) => s + r.precio, 0) / this.recursos.length).toFixed(2);

  ultimaInteraccion = '';

  alSeleccionarFila(fila: Record<string, any>): void {
    this.ultimaInteraccion = `Fila seleccionada: ${fila['titulo']}`;
  }

  alPulsarWidget(titulo: string): void {
    this.ultimaInteraccion = `Widget pulsado: ${titulo}`;
  }
}
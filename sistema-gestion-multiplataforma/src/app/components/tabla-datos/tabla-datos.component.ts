import { Component, computed, input, output, signal } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';

export interface Columna {
  campo: string;
  titulo: string;
}

@Component({
  selector: 'app-tabla-datos',
  templateUrl: './tabla-datos.component.html',
  styleUrls: ['./tabla-datos.component.scss'],
  imports: [IonSearchbar],
})
export class TablaDatosComponent {
  // Props (entradas)
  columnas = input.required<Columna[]>();
  datos = input.required<Record<string, any>[]>();

  // Eventos (salidas)
  filaSeleccionada = output<Record<string, any>>();

  // Estado interno del buscador
  busqueda = signal('');

  filtrados = computed(() => {
    const termino = this.busqueda().toLowerCase().trim();
    if (!termino) return this.datos();
    return this.datos().filter(fila =>
      this.columnas().some(c => String(fila[c.campo] ?? '').toLowerCase().includes(termino)),
    );
  });

  descripcion = input('Tabla de datos');

seleccionar(fila: Record<string, any>): void {
  this.filaSeleccionada.emit(fila);
}
}
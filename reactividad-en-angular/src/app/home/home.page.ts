import { Component, computed, effect, signal, ChangeDetectionStrategy } from
'@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton,
IonIcon, IonBadge } from '@ionic/angular';
// Interfaz para el tipado de datos
export interface Producto {
id: number;
nombre: string;
precio: number;
categoria:string;
}

@Component({
selector: 'app-carrito-signals',
changeDetection: ChangeDetectionStrategy.OnPush, // Optimización crítica
imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton,
    IonBadge],
template: `
<ion-header>
  <ion-toolbar color="chartreuse">
    <ion-title>Carrito Reactivo</ion-title>
    <!-- Lectura de la señal computada en el template usando () -->
    <ion-badge slot="end" color="white" class="ion-margin-end">
      Total: {{ precioTotal() }}€
    </ion-badge>
  </ion-toolbar>
</ion-header>
<ion-content>
  <ion-list>
    <!-- Nuevo Control Flow de Angular -->
    @for (prod of productos(); track prod.id) {
    <ion-item>
      <ion-label>
        <h2>{{ prod.nombre }}</h2>
        <p>{{prod.categoria}}</p>
        <p>{{ prod.precio }}€</p>
      </ion-label>
      <ion-button fill="clear" (click)="eliminarProducto(prod.id)" color="chartreuse">
        Eliminar
      </ion-button>
    </ion-item>
    } @empty {
    <ion-item>
      <ion-label class="ion-text-center" color="chartreuse">El carrito está vacío</ion-label>
    </ion-item>
    }
  </ion-list>
  <div class="ion-padding">
    <ion-button expand="block" (click)="agregarProductoAleatorio()">
      Añadir Producto Random
    </ion-button>
  </div>
</ion-content>
`
})
export class HomePage {
// 1. Estado Writable (WritableSignal)
public productos = signal<Producto[]>([
  { id: 1, nombre: 'Licencia IDE', precio: 89, categoria: 'licencias' },
  { id: 2, nombre: 'Teclado Mecánico', precio: 120, categoria: 'Componente' }
  ]);
  // 2. Estado Derivado (Computed Signal) - Se recalcula solo si 'productos' cambia
  public precioTotal = computed(() => {
  return this.productos().reduce((total, prod) => total + prod.precio, 0);
  });
  constructor() {
  // 3. Efecto Secundario (Effect) - Se ejecuta en la inicialización y cada vez que 'productos' cambie
  effect(() => {
  console.log(`[Persistencia] Carrito actualizado con éxito. Items:
  ${this.productos().length}`);
  // Aquí integraríamos Preferences API de Capacitor para persistir localmente
  });
  }
  // Métodos de mutación de estado
  public agregarProductoAleatorio(): void {
  const nuevoId = Math.floor(Math.random() * 1000) + 3;
  const nuevoProducto: Producto = { id: nuevoId, nombre: `Monitor ${nuevoId}`, precio: 250, categoria: 'Monitores' };
  // Mutación usando .update() - Inmutabilidad recomendada
  this.productos.update(estadoAnterior => [...estadoAnterior, nuevoProducto]);
  }
  public eliminarProducto(id: number): void {
  this.productos.update(estadoAnterior => estadoAnterior.filter(p => p.id !== id));
  }
  }
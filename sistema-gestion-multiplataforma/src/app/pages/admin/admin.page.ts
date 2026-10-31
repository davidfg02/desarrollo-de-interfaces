import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, computed, inject, signal } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { RealtimeChannel } from '@supabase/supabase-js';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonButton, IonItem, IonSelect, IonSelectOption, IonSpinner, IonText, IonRow, IonCol, IonGrid } from '@ionic/angular';
import { Columna, TablaDatosComponent } from '../../components/tabla-datos/tabla-datos.component';
import { VentasService, VentaDetalle } from '../../services/ventas';
import { ValoracionesService, Valoracion } from '../../services/valoraciones';
import { InformesService } from '../../services/informes';

Chart.register(...registerables);

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton,
    IonButton, IonItem, IonSelect, IonSelectOption, IonSpinner, IonText,
    TablaDatosComponent,
    IonRow,
    IonCol,
    IonGrid
],
})
export class AdminPage implements AfterViewInit, OnDestroy {
  private ventasSrv = inject(VentasService);
  private valoracionesSrv = inject(ValoracionesService);
  private informes = inject(InformesService);

  @ViewChild('lienzoVentas') lienzoVentas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lienzoValoraciones') lienzoValoraciones!: ElementRef<HTMLCanvasElement>;

  cargando = signal(true);
  error = signal('');
  ventas = signal<VentaDetalle[]>([]);
  valoraciones = signal<Valoracion[]>([]);
  categoriaSeleccionada = signal('todas');

  categorias = computed(() => ['todas', ...new Set(this.ventas().map(v => v.categoria))]);
  ventasFiltradas = computed(() =>
    this.categoriaSeleccionada() === 'todas'
      ? this.ventas()
      : this.ventas().filter(v => v.categoria === this.categoriaSeleccionada()),
  );

  columnas: Columna[] = [
    { campo: 'fecha', titulo: 'Fecha' },
    { campo: 'recurso', titulo: 'Recurso' },
    { campo: 'categoria', titulo: 'Categoría' },
    { campo: 'cantidad', titulo: 'Cantidad' },
    { campo: 'total', titulo: 'Total (€)' },
  ];

  private graficoVentas?: Chart;
  private graficoValoraciones?: Chart;
  private canal?: RealtimeChannel;

  async ngAfterViewInit(): Promise<void> {
    await this.cargarDatos();
    this.canal = this.valoracionesSrv.escucharCambios(() => this.recargarValoraciones());
  }

  ngOnDestroy(): void {
    this.graficoVentas?.destroy();
    this.graficoValoraciones?.destroy();
    if (this.canal) this.valoracionesSrv.detenerEscucha(this.canal);
  }

  private async cargarDatos(): Promise<void> {
    this.cargando.set(true);
    this.error.set('');
    try {
      // Las dos fuentes se consultan a la vez
      const [ventas, valoraciones] = await Promise.all([
        this.ventasSrv.obtenerVentas(),
        this.valoracionesSrv.obtenerValoraciones(),
      ]);
      this.ventas.set(ventas);
      this.valoraciones.set(valoraciones);
      this.dibujarGraficoVentas();
      this.dibujarGraficoValoraciones();
    } catch {
      this.error.set('No se pudieron cargar los datos');
    } finally {
      this.cargando.set(false);
    }
  }

  private async recargarValoraciones(): Promise<void> {
    try {
      this.valoraciones.set(await this.valoracionesSrv.obtenerValoraciones());
      this.dibujarGraficoValoraciones();
    } catch {
      this.error.set('No se pudieron actualizar las valoraciones');
    }
  }

  private dibujarGraficoVentas(): void {
    this.graficoVentas?.destroy();
    const porRecurso = new Map<string, number>();
    for (const v of this.ventasFiltradas()) {
      porRecurso.set(v.recurso, (porRecurso.get(v.recurso) ?? 0) + v.total);
    }
    this.graficoVentas = new Chart(this.lienzoVentas.nativeElement, {
      type: 'bar',
      data: {
        labels: [...porRecurso.keys()],
        datasets: [{ label: 'Ingresos (€)', data: [...porRecurso.values()] }],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });
  }

  private dibujarGraficoValoraciones(): void {
    this.graficoValoraciones?.destroy();
    const puntuaciones = [1, 2, 3, 4, 5];
    this.graficoValoraciones = new Chart(this.lienzoValoraciones.nativeElement, {
      type: 'doughnut',
      data: {
        labels: puntuaciones.map(p => `${p} estrellas`),
        datasets: [{ data: puntuaciones.map(p => this.valoraciones().filter(v => v.puntuacion === p).length) }],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });
  }

  alCambiarCategoria(evento: CustomEvent): void {
    this.categoriaSeleccionada.set(evento.detail.value);
    this.dibujarGraficoVentas();
  }

  exportarCSV(): void {
    this.informes.exportarCSV('informe-ventas', this.columnas, this.ventasFiltradas());
  }

  exportarPDF(): void {
    this.informes.exportarPDF('informe-ventas', 'Informe de ventas', this.columnas, this.ventasFiltradas());
  }
}
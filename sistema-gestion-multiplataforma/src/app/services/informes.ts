import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Columna } from '../components/tabla-datos/tabla-datos.component';

@Injectable({ providedIn: 'root' })
export class InformesService {
  exportarCSV(nombre: string, columnas: Columna[], filas: Record<string, any>[]): void {
    const cabecera = columnas.map(c => this.escapar(c.titulo)).join(';');
    const lineas = filas.map(f => columnas.map(c => this.escapar(f[c.campo])).join(';'));
    const csv = '\uFEFF' + [cabecera, ...lineas].join('\n');
    this.descargar(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), `${nombre}.csv`);
  }

  exportarPDF(nombre: string, titulo: string, columnas: Columna[], filas: Record<string, any>[]): void {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(titulo, 14, 16);
    autoTable(doc, {
      startY: 24,
      head: [columnas.map(c => c.titulo)],
      body: filas.map(f => columnas.map(c => String(f[c.campo] ?? ''))),
    });
    doc.save(`${nombre}.pdf`);
  }

  private escapar(valor: unknown): string {
    const texto = String(valor ?? '');
    return /[";\n]/.test(texto) ? `"${texto.replace(/"/g, '""')}"` : texto;
  }

  private descargar(blob: Blob, nombreArchivo: string): void {
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = nombreArchivo;
    enlace.click();
    URL.revokeObjectURL(url);
  }
}
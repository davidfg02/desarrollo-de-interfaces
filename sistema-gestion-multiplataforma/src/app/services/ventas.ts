import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth';

export interface VentaDetalle {
  id: number;
  fecha: string;
  recurso: string;
  categoria: string;
  cantidad: number;
  total: number;
}

@Injectable({ providedIn: 'root' })
export class VentasService {
  private auth = inject(AuthService);

  async obtenerVentas(): Promise<VentaDetalle[]> {
    const { data, error } = await this.auth.supabase
      .from('ventas')
      .select('id, cantidad, fecha, recursos(titulo, categoria, precio)')
      .order('fecha', { ascending: false });
    if (error) throw error;

    return (data as any[]).map(v => ({
      id: v.id,
      fecha: v.fecha,
      recurso: v.recursos.titulo,
      categoria: v.recursos.categoria,
      cantidad: v.cantidad,
      total: v.cantidad * v.recursos.precio,
    }));
  }
}
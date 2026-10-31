import { Injectable, inject } from '@angular/core';
import { RealtimeChannel } from '@supabase/supabase-js';
import { AuthService } from './auth';

export interface Valoracion {
  id: number;
  recurso: string;
  puntuacion: number;
  comentario: string;
}

@Injectable({ providedIn: 'root' })
export class ValoracionesService {
  private auth = inject(AuthService);

  async obtenerValoraciones(): Promise<Valoracion[]> {
    const { data, error } = await this.auth.supabase.from('valoraciones').select('id, documento');
    if (error) throw error;
    return (data as any[]).map(d => ({ id: d.id, ...d.documento }));
  }

  escucharCambios(alCambiar: () => void): RealtimeChannel {
    return this.auth.supabase
      .channel('valoraciones-cambios')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'valoraciones' }, () => alCambiar())
      .subscribe();
  }

  detenerEscucha(canal: RealtimeChannel): void {
    this.auth.supabase.removeChannel(canal);
  }
}
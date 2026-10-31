import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

export type Rol = 'admin' | 'usuario';
export interface Perfil { id: string; email: string; nombre: string; rol: Rol; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly supabase: SupabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);
  private perfilSubject = new BehaviorSubject<Perfil | null>(null);
  perfil$ = this.perfilSubject.asObservable();
  private listo: Promise<void>;

  constructor() {
    this.listo = this.cargarSesion();
  }

  private async cargarSesion(): Promise<void> {
    const { data } = await this.supabase.auth.getSession();
    if (data.session) await this.cargarPerfil(data.session.user.id);
  }

  private async cargarPerfil(id: string): Promise<void> {
    const { data } = await this.supabase.from('perfiles').select('*').eq('id', id).single();
    this.perfilSubject.next(data as Perfil | null);
  }

  esperarListo(): Promise<void> { return this.listo; }
  get perfil(): Perfil | null { return this.perfilSubject.value; }
  estaLogueado(): boolean { return this.perfil !== null; }
  tieneRol(rol: Rol): boolean { return this.perfil?.rol === rol; }

  async login(email: string, password: string): Promise<void> {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    await this.cargarPerfil(data.user.id);
  }

  async registro(nombre: string, email: string, password: string): Promise<void> {
    const { data, error } = await this.supabase.auth.signUp({
      email, password, options: { data: { nombre } },
    });
    if (error) throw error;
    if (data.user) await this.cargarPerfil(data.user.id);
  }

  async logout(): Promise<void> {
    await this.supabase.auth.signOut();
    this.perfilSubject.next(null);
  }

  async emailExiste(email: string): Promise<boolean> {
    const { data, error } = await this.supabase.rpc('email_existe', { p_email: email });
    if (error) throw error;
    return data as boolean;
  }
}
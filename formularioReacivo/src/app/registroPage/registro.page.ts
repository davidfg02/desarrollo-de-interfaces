import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInput, IonButton, IonSpinner, IonDatetime, IonAlert, IonButtons, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { jsPDF } from 'jspdf';
import { moonOutline, personCircleOutline, sunnyOutline, downloadOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'registro.page.html',
  styleUrls: ['registro.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, IonList, IonItem, IonInput, IonButton, IonSpinner, ReactiveFormsModule, IonDatetime, IonAlert, IonButtons, IonIcon],
})
export class HomePage {
  public registroForm: FormGroup;
  public isSubmitting = signal<boolean>(false);
  public isDark = signal<boolean>(false);
  public mostrarAlerta = false;

  public datosEnviados = signal<{ nombre: string; email: string; fecha: string } | null>(null);

  public submit = [
    {
      text: 'Aceptar',
      role: 'confirm'
    }
  ];

  constructor(private fb: FormBuilder) {
    addIcons({ personCircleOutline, moonOutline, sunnyOutline, downloadOutline });

    // Recupera la preferencia de tema guardada o usa la del sistema
    const saved = localStorage.getItem('theme');
    const prefersDark = saved
      ? saved === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setDark(prefersDark);

    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      // Patrón: Mínimo 8 caracteres, al menos una letra y un número.
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
      fecha: ['', Validators.required]
    });
  }

  // Getter de conveniencia para acceder a los controles en la vista
  get f() { return this.registroForm.controls; }

  public toggleDark(): void {
    this.setDark(!this.isDark());
  }

  private setDark(dark: boolean): void {
    this.isDark.set(dark);
    document.documentElement.classList.toggle('ion-palette-dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }

  private async hashPassword(password: string): Promise<string> {
    const data = new TextEncoder().encode(password);
    const buffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  public async onSubmit(): Promise<void> {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched(); // Fuerza la visualización de errores
      return;
    }
    this.isSubmitting.set(true);

    try {
      const { password, ...resto } = this.registroForm.value;
      const payload = {
        ...resto,
        password: await this.hashPassword(password),
      };

      console.log('Payload a enviar a la API REST:', payload);
      // Simulación de llamada asíncrona a un backend HTTP
      await new Promise(resolve => setTimeout(resolve, 2000));

      this.datosEnviados.set({
        nombre: resto.nombre,
        email: resto.email,
        fecha: resto.fecha,
      });

      this.mostrarAlerta = true;
      // Aquí se implementaría: this.httpClient.post('url', payload).subscribe(...)
      this.registroForm.reset();

    } catch (error) {
      console.error('Error al persistir los datos', error);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  public descargarPdf(): void {
    const datos = this.datosEnviados();
    if (!datos) return;

    const doc = new jsPDF();
    const fecha = new Date(datos.fecha).toLocaleDateString('es-ES');

    doc.setFontSize(18);
    doc.text('Datos del registro', 20, 25);

    doc.setFontSize(12);
    doc.text(`Nombre: ${datos.nombre}`, 20, 45);
    doc.text(`Correo electrónico: ${datos.email}`, 20, 55);
    doc.text(`Fecha seleccionada: ${fecha}`, 20, 65);

    doc.setFontSize(10);
    doc.text(`Generado el ${new Date().toLocaleString('es-ES')}`, 20, 85);

    doc.save('registro.pdf');
  }
}
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CvService } from '../../../services/cv.service';

@Component({
  selector: 'app-cv-editor',
  imports: [RouterLink],
  templateUrl: './cv-editor.html',
  styleUrl: './cv-editor.scss',
})
export class CvEditor implements OnInit {
  private cvService = inject(CvService);

  cvUrlEs = this.cvService.cvUrlEs;
  cvUrlEn = this.cvService.cvUrlEn;

  uploading: 'es' | 'en' | null = null;
  successMsg = '';
  errorMsg = '';

  async ngOnInit(): Promise<void> {
    await this.cvService.loadUrls();
  }

  async onFileSelected(event: Event, lang: 'es' | 'en'): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      this.errorMsg = 'Solo se permiten archivos PDF';
      return;
    }

    this.uploading = lang;
    this.successMsg = '';
    this.errorMsg = '';

    const result = await this.cvService.upload(file, lang);

    this.uploading = null;
    input.value = '';

    if (result.success) {
      this.successMsg = `CV (${lang.toUpperCase()}) subido correctamente`;
    } else {
      this.errorMsg = result.error ?? 'Error al subir el archivo';
    }
  }

  async deleteCv(lang: 'es' | 'en'): Promise<void> {
    if (!confirm(`¿Eliminar el CV en ${lang.toUpperCase()}?`)) return;

    this.successMsg = '';
    this.errorMsg = '';

    const result = await this.cvService.delete(lang);

    if (result.success) {
      this.successMsg = `CV (${lang.toUpperCase()}) eliminado`;
    } else {
      this.errorMsg = result.error ?? 'Error al eliminar';
    }
  }
}

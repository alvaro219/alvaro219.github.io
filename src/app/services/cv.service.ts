import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';

const BUCKET = 'cv';

@Injectable({ providedIn: 'root' })
export class CvService {
  private supabase = inject(SupabaseService);

  cvUrlEs = signal<string | null>(null);
  cvUrlEn = signal<string | null>(null);

  async loadUrls(): Promise<void> {
    this.cvUrlEs.set(await this.getPublicUrl('CV-Alvaro-Anton-Macia.pdf'));
    this.cvUrlEn.set(await this.getPublicUrl('CV-Alvaro-Anton-Macia-EN.pdf'));
  }

  private async getPublicUrl(path: string): Promise<string | null> {
    const { data } = this.supabase.client.storage.from(BUCKET).getPublicUrl(path);
    if (!data?.publicUrl) return null;

    // Check if file actually exists by making a HEAD request
    try {
      const res = await fetch(data.publicUrl, { method: 'HEAD' });
      return res.ok ? data.publicUrl : null;
    } catch {
      return null;
    }
  }

  private fileName(lang: 'es' | 'en'): string {
    return lang === 'es' ? 'CV-Alvaro-Anton-Macia.pdf' : 'CV-Alvaro-Anton-Macia-EN.pdf';
  }

  async upload(file: File, lang: 'es' | 'en'): Promise<{ success: boolean; error?: string }> {
    const path = this.fileName(lang);

    const { error } = await this.supabase.client.storage
      .from(BUCKET)
      .upload(path, file, { upsert: true, contentType: 'application/pdf' });

    if (error) {
      return { success: false, error: error.message };
    }

    await this.loadUrls();
    return { success: true };
  }

  async delete(lang: 'es' | 'en'): Promise<{ success: boolean; error?: string }> {
    const path = this.fileName(lang);
    const { error } = await this.supabase.client.storage.from(BUCKET).remove([path]);

    if (error) {
      return { success: false, error: error.message };
    }

    if (lang === 'es') this.cvUrlEs.set(null);
    else this.cvUrlEn.set(null);
    return { success: true };
  }

  getCvUrl(lang: 'es' | 'en'): string | null {
    return lang === 'es' ? this.cvUrlEs() : this.cvUrlEn();
  }
}

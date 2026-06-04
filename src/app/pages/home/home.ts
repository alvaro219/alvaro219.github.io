import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PROFILE, SKILLS_HIGHLIGHTED, SKILL_GROUPS } from '../../data/static-data';
import { TelegramService } from '../../services/telegram.service';
import { ProjectService } from '../../services/project.service';
import { I18nService } from '../../services/i18n.service';
import { CvService } from '../../services/cv.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-home',
  imports: [FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private telegram = inject(TelegramService);
  private projectService = inject(ProjectService);
  private cvService = inject(CvService);
  i18n = inject(I18nService);

  profile = PROFILE;
  highlighted = SKILLS_HIGHLIGHTED;
  skillGroups = SKILL_GROUPS;
  projects = this.projectService.projects;

  expandedProject: string | null = null;

  contactForm = { name: '', contact: '', message: '' };
  privacyAccepted = false;
  sending = false;
  contactSuccess = '';
  contactError = '';

  ngOnInit(): void {
    if (this.projects().length === 0) {
      this.projectService.loadProjects();
    }
    this.cvService.loadUrls();
  }

  get cvUrl(): string {
    const url = this.cvService.getCvUrl(this.i18n.lang());
    return url ?? '/cv/CV-Alvaro-Anton-Macia.pdf';
  }

  downloadCv(event: Event): void {
    event.preventDefault();
    const lang = this.i18n.lang();
    const fileName = lang === 'es' ? 'CV-Alvaro-Anton-Macia.pdf' : 'CV-Alvaro-Anton-Macia-EN.pdf';
    this.telegram.send(
      `📄 *Descarga de CV*\n` +
      `Idioma: ${lang.toUpperCase()}\n` +
      `Archivo: ${fileName}\n` +
      `Fecha: ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}`
    );
    window.open(this.cvUrl, '_blank');
  }

  get currentProjects(): Project[] {
    return this.projects().filter((p) => p.is_current);
  }

  get featuredProjects(): Project[] {
    return this.projects().filter((p) => !p.is_current);
  }

  toggleExpand(name: string): void {
    this.expandedProject = this.expandedProject === name ? null : name;
  }

  isExpanded(name: string): boolean {
    return this.expandedProject === name;
  }

  periodEnd(value: string): string {
    if (value === 'Presente') {
      return this.i18n.lang() === 'en' ? 'Present' : 'Presente';
    }
    return value;
  }

  pRole(p: Project): string {
    return (this.i18n.lang() === 'en' && p.role_en) ? p.role_en : p.role;
  }

  pDesc(p: Project): string {
    return (this.i18n.lang() === 'en' && p.description_en) ? p.description_en : p.description;
  }

  pHighlights(p: Project): string[] {
    return (this.i18n.lang() === 'en' && p.highlights_en?.length) ? p.highlights_en : p.highlights;
  }

  pImpact(p: Project): string {
    return (this.i18n.lang() === 'en' && p.impact_en) ? p.impact_en : p.impact;
  }

  groupLabel(label: string): string {
    const map: Record<string, 'front' | 'backDb' | 'tools'> = {
      'Front': 'front',
      'Back & DB': 'backDb',
      'Herramientas & DevOps': 'tools',
    };
    const key = map[label];
    return key ? this.i18n.t().skillGroups[key] : label;
  }

  visibleTechs(project: Project): number {
    return Math.min(project.technologies?.length ?? 0, 4);
  }

  extraTechCount(project: Project): number {
    return Math.max(0, (project.technologies?.length ?? 0) - 4);
  }

  async sendContact(): Promise<void> {
    if (!this.privacyAccepted) {
      this.contactError = this.i18n.t().home.contactErrorPrivacy;
      return;
    }
    if (!this.contactForm.name || !this.contactForm.contact || !this.contactForm.message) {
      this.contactError = this.i18n.t().home.contactErrorRequired;
      return;
    }

    this.sending = true;
    this.contactError = '';
    this.contactSuccess = '';

    const msg =
      `📬 *Nuevo contacto desde el portfolio*\n\n` +
      `*Nombre:* ${this.contactForm.name}\n` +
      `*Contacto:* ${this.contactForm.contact}\n` +
      `*Mensaje:* ${this.contactForm.message}`;

    const ok = await this.telegram.send(msg);
    this.sending = false;

    if (ok) {
      this.contactSuccess = this.i18n.t().home.contactSuccess;
      this.contactForm = { name: '', contact: '', message: '' };
      this.privacyAccepted = false;
    } else {
      this.contactError = this.i18n.t().home.contactErrorSend;
    }
  }
}

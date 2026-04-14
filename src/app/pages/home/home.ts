import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PROFILE, SKILLS } from '../../data/static-data';
import { TelegramService } from '../../services/telegram.service';
import { ProjectService } from '../../services/project.service';
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

  profile = PROFILE;
  skills = SKILLS;
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

  visibleTechs(project: Project): number {
    return Math.min(project.technologies?.length ?? 0, 4);
  }

  extraTechCount(project: Project): number {
    return Math.max(0, (project.technologies?.length ?? 0) - 4);
  }

  async sendContact(): Promise<void> {
    if (!this.privacyAccepted) {
      this.contactError = 'Debes aceptar la política de privacidad';
      return;
    }
    if (!this.contactForm.name || !this.contactForm.contact || !this.contactForm.message) {
      this.contactError = 'Todos los campos son obligatorios';
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
      this.contactSuccess = '¡Mensaje enviado correctamente! Te responderé pronto.';
      this.contactForm = { name: '', contact: '', message: '' };
      this.privacyAccepted = false;
    } else {
      this.contactError = 'Error al enviar. Inténtalo de nuevo o escríbeme directamente.';
    }
  }
}

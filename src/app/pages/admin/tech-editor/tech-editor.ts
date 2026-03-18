import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { Technology } from '../../../models/project.model';

@Component({
  selector: 'app-tech-editor',
  imports: [RouterLink, FormsModule],
  templateUrl: './tech-editor.html',
  styleUrl: './tech-editor.scss',
})
export class TechEditor implements OnInit {
  private projectService = inject(ProjectService);

  technologies = this.projectService.technologies;
  loading = true;
  saving = false;
  success = '';
  error = '';

  newTech: Partial<Technology> = { name: '', icon: '', category: '' };
  editingId: string | null = null;
  editTech: Partial<Technology> = {};

  async ngOnInit(): Promise<void> {
    await this.projectService.loadTechnologies();
    this.loading = false;
  }

  async addTechnology(): Promise<void> {
    if (!this.newTech.name || !this.newTech.icon) return;
    this.saving = true;
    const { error } = await this.projectService.saveTechnology(this.newTech);
    this.saving = false;
    if (error) {
      this.error = error;
    } else {
      this.success = `${this.newTech.name} añadida`;
      this.newTech = { name: '', icon: '', category: '' };
      await this.projectService.loadTechnologies();
      setTimeout(() => (this.success = ''), 3000);
    }
  }

  startEdit(tech: Technology): void {
    this.editingId = tech.id ?? null;
    this.editTech = { ...tech };
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editTech = {};
  }

  async saveEdit(): Promise<void> {
    this.saving = true;
    const { error } = await this.projectService.saveTechnology(this.editTech);
    this.saving = false;
    if (error) {
      this.error = error;
    } else {
      this.editingId = null;
      this.editTech = {};
      await this.projectService.loadTechnologies();
      this.success = 'Tecnología actualizada';
      setTimeout(() => (this.success = ''), 3000);
    }
  }

  async deleteTech(id: string | undefined, name: string): Promise<void> {
    if (!id) return;
    if (!confirm(`¿Eliminar "${name}"? Se desvinculará de todos los proyectos.`)) return;
    const { error } = await this.projectService.deleteTechnology(id);
    if (!error) {
      await this.projectService.loadTechnologies();
    }
  }
}

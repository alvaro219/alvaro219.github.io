import { Component, OnInit, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { Project, Technology } from '../../../models/project.model';

@Component({
  selector: 'app-project-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './project-form.html',
  styleUrl: './project-form.scss',
})
export class ProjectForm implements OnInit {
  private projectService = inject(ProjectService);
  private router = inject(Router);

  id = input<string>();

  project: Partial<Project> = {
    name: '',
    role: '',
    description: '',
    period_start: '',
    period_end: '',
    importance: 'medium',
    highlights: [],
    impact: '',
    is_current: false,
    sort_order: 0,
    active: true,
  };

  allTechnologies: Technology[] = [];
  selectedTechIds = new Set<string>();
  highlightsText = '';
  loading = true;
  saving = false;
  success = '';
  error = '';
  isNew = true;

  async ngOnInit(): Promise<void> {
    await this.projectService.loadTechnologies();
    this.allTechnologies = this.projectService.technologies();

    const projectId = this.id();
    if (projectId && projectId !== 'new') {
      this.isNew = false;
      const existing = await this.projectService.getProjectById(projectId);
      if (existing) {
        this.project = { ...existing };
        this.highlightsText = (existing.highlights ?? []).join('\n');
        existing.technologies?.forEach((t) => {
          if (t.id) this.selectedTechIds.add(t.id);
        });
      }
    }
    this.loading = false;
  }

  toggleTech(id: string): void {
    if (this.selectedTechIds.has(id)) {
      this.selectedTechIds.delete(id);
    } else {
      this.selectedTechIds.add(id);
    }
    this.selectedTechIds = new Set(this.selectedTechIds);
  }

  isTechSelected(id: string): boolean {
    return this.selectedTechIds.has(id);
  }

  async onSubmit(): Promise<void> {
    this.saving = true;
    this.error = '';
    this.success = '';

    this.project.highlights = this.highlightsText
      .split('\n')
      .map((h) => h.trim())
      .filter((h) => h.length > 0);

    const { error } = await this.projectService.saveProject(this.project);
    if (error) {
      this.error = error;
      this.saving = false;
      return;
    }

    if (this.project.id) {
      await this.projectService.setProjectTechnologies(
        this.project.id,
        Array.from(this.selectedTechIds)
      );
    }

    this.saving = false;
    this.success = this.isNew ? 'Proyecto creado correctamente' : 'Proyecto actualizado';
    setTimeout(() => this.router.navigate(['/admin/projects']), 1200);
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-project-editor',
  imports: [RouterLink],
  templateUrl: './project-editor.html',
  styleUrl: './project-editor.scss',
})
export class ProjectEditor implements OnInit {
  private projectService = inject(ProjectService);

  projects: Project[] = [];
  loading = true;

  async ngOnInit(): Promise<void> {
    this.projects = await this.projectService.getAllProjects();
    this.loading = false;
  }

  async deleteProject(id: string | undefined, name: string): Promise<void> {
    if (!id) return;
    if (!confirm(`¿Eliminar el proyecto "${name}"?`)) return;
    const { error } = await this.projectService.deleteProject(id);
    if (!error) {
      this.projects = this.projects.filter((p) => p.id !== id);
    }
  }

  async toggleActive(project: Project): Promise<void> {
    project.active = !project.active;
    await this.projectService.saveProject({ id: project.id, active: project.active });
  }
}

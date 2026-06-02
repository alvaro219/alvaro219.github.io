import { Component, OnInit, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { I18nService } from '../../services/i18n.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
})
export class ProjectDetail implements OnInit {
  private projectService = inject(ProjectService);
  private router = inject(Router);
  i18n = inject(I18nService);

  id = input.required<string>();
  project: Project | null = null;
  loading = true;

  async ngOnInit(): Promise<void> {
    this.project = await this.projectService.getProjectById(this.id());
    this.loading = false;
    if (!this.project) {
      this.router.navigate(['/proyectos']);
    }
  }

  get role(): string {
    if (!this.project) return '';
    return (this.i18n.lang() === 'en' && this.project.role_en) ? this.project.role_en : this.project.role;
  }

  get description(): string {
    if (!this.project) return '';
    return (this.i18n.lang() === 'en' && this.project.description_en) ? this.project.description_en : this.project.description;
  }

  get highlights(): string[] {
    if (!this.project) return [];
    return (this.i18n.lang() === 'en' && this.project.highlights_en?.length) ? this.project.highlights_en : this.project.highlights;
  }

  get impact(): string {
    if (!this.project) return '';
    return (this.i18n.lang() === 'en' && this.project.impact_en) ? this.project.impact_en : this.project.impact;
  }

  periodEnd(value: string): string {
    if (value === 'Presente') {
      return this.i18n.lang() === 'en' ? 'Present' : 'Presente';
    }
    return value;
  }
}

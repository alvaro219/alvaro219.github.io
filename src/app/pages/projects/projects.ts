import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { I18nService } from '../../services/i18n.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-projects',
  imports: [RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit {
  private projectService = inject(ProjectService);
  private route = inject(ActivatedRoute);
  i18n = inject(I18nService);

  projects = this.projectService.projects;
  technologies = this.projectService.technologies;
  loading = this.projectService.loading;

  activeFilters = new Set<string>();

  ngOnInit(): void {
    if (this.projects().length === 0) {
      this.projectService.loadProjects();
    }
    if (this.technologies().length === 0) {
      this.projectService.loadTechnologies();
    }

    const tech = this.route.snapshot.queryParamMap.get('tech');
    if (tech) {
      this.activeFilters = new Set([tech]);
    }
  }

  get filteredProjects() {
    const list = this.activeFilters.size === 0
      ? this.projects()
      : this.projects().filter((p) =>
          p.technologies?.some((t) => this.activeFilters.has(t.name))
        );
    return [...list].sort((a, b) => (b.is_current ? 1 : 0) - (a.is_current ? 1 : 0));
  }

  toggleFilter(name: string): void {
    if (this.activeFilters.has(name)) {
      this.activeFilters.delete(name);
    } else {
      this.activeFilters.add(name);
    }
    this.activeFilters = new Set(this.activeFilters);
  }

  clearFilters(): void {
    this.activeFilters = new Set();
  }

  isActive(name: string): boolean {
    return this.activeFilters.has(name);
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
}

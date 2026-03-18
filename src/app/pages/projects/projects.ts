import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  imports: [RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit {
  private projectService = inject(ProjectService);

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
  }

  get filteredProjects() {
    if (this.activeFilters.size === 0) return this.projects();
    return this.projects().filter((p) =>
      p.technologies?.some((t) => this.activeFilters.has(t.name))
    );
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
}

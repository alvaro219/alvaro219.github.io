import { Component, OnInit, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project.service';
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
}

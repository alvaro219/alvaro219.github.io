import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  auth = inject(AuthService);
  private projectService = inject(ProjectService);

  projectCount = 0;
  techCount = 0;

  async ngOnInit(): Promise<void> {
    const projects = await this.projectService.getAllProjects();
    this.projectCount = projects.length;
    await this.projectService.loadTechnologies();
    this.techCount = this.projectService.technologies().length;
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
  }
}

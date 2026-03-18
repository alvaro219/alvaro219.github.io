import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { ProfileInfo } from '../../../models/project.model';

@Component({
  selector: 'app-profile-editor',
  imports: [RouterLink, FormsModule],
  templateUrl: './profile-editor.html',
  styleUrl: './profile-editor.scss',
})
export class ProfileEditor implements OnInit {
  private projectService = inject(ProjectService);

  profile: Partial<ProfileInfo> = {
    name: '',
    title: '',
    description: '',
    photo: '',
    education: [],
  };

  educationText = '';
  loading = true;
  saving = false;
  success = '';
  error = '';

  async ngOnInit(): Promise<void> {
    await this.projectService.loadProfile();
    const p = this.projectService.profile();
    if (p) {
      this.profile = { ...p };
      this.educationText = (p.education ?? []).join('\n');
    }
    this.loading = false;
  }

  async onSubmit(): Promise<void> {
    this.saving = true;
    this.error = '';
    this.success = '';

    this.profile.education = this.educationText
      .split('\n')
      .map((e) => e.trim())
      .filter((e) => e.length > 0);

    const { error } = await this.projectService.saveProfile(this.profile);
    this.saving = false;

    if (error) {
      this.error = error;
    } else {
      this.success = 'Perfil actualizado correctamente';
      setTimeout(() => (this.success = ''), 3000);
    }
  }
}

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  error = '';
  loading = false;

  async onSubmit(): Promise<void> {
    this.loading = true;
    this.error = '';
    const { error } = await this.auth.signIn(this.email, this.password);
    this.loading = false;
    if (error) {
      this.error = error;
    } else if (this.auth.admin()) {
      this.router.navigate(['/admin']);
    } else {
      this.error = 'No tienes permisos de administrador.';
    }
  }
}

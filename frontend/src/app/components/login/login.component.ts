import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ IMPORTANT
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// Angular Material
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, // ✅ AJOUT ICI
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  hidePassword = true;
  activeRole = 'employe';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]], //
    });
  }

  setRole(role: string) {
    this.activeRole = role;
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.open(
          err.error?.message || 'Email ou mot de passe incorrect',
          'Fermer',
          { duration: 3000 },
        );
      },
    });
  }

  get emailError(): string {
    const c = this.loginForm.get('email');
    if (c?.hasError('required')) return 'Email obligatoire';
    if (c?.hasError('email')) return 'Email invalide';
    return '';
  }

  get passwordError(): string {
    const c = this.loginForm.get('password');
    if (c?.hasError('required')) return 'Mot de passe obligatoire';
    if (c?.hasError('minlength')) return 'Minimum 6 caractères';
    return '';
  }
}

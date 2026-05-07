import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { DepartmenteTsService } from '../../services/departmente.ts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  departments: any[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private departmentService: DepartmenteTsService,
  ) {
    this.registerForm = this.fb.group(
      {
        nom: ['', [Validators.required, Validators.minLength(3)]],
        prenom: ['', [Validators.required, Validators.minLength(3)]],
        date_naissance: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}$/),
          ],
        ],
        confirmPassword: ['', Validators.required],
        position: [''],
        department: [''],
        hireDate: [''],
        role: ['USER', Validators.required], // 👈 AJOUT
      },
      { validators: this.passwordMatchValidator },
    );
  }
  ngOnInit(): void {
    this.loadDepartments();
  }
  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mustMatch: true };
  }

  register() {
    if (this.registerForm.invalid) {
      Object.keys(this.registerForm.controls).forEach((key) => {
        const control = this.registerForm.get(key);

        if (control?.invalid) {
          console.log('Champ invalide :', key);
          console.log('Erreur :', control.errors);
        }
      });

      console.log('Erreur globale :', this.registerForm.errors);

      this.toastr.error('Formulaire invalide');
      this.registerForm.markAllAsTouched();
      return;
    }

    const data = {
      ...this.registerForm.value,
      hireDate: this.registerForm.value.hireDate
        ? new Date(this.registerForm.value.hireDate)
        : null,
    };

    console.log('Données envoyées :', data);

    this.authService.signup(data).subscribe({
      next: (res) => {
        console.log('Succès :', res);
        this.toastr.success('Compte créé avec succès !');
        this.router.navigate(['/login']);
      },

      error: (err) => {
        console.log('Erreur backend :', err);

        this.toastr.error(err.error?.message || 'Erreur serveur');
      },
    });
  }
  loadDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (data) => {
        console.log('departments:', data); // 👈 DOIT afficher ton JSON
        this.departments = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

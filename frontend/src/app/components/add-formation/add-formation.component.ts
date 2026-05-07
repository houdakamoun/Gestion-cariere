import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FormationService } from '../../services/formation.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-formation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.css'],
})
export class AddFormationComponent implements OnInit {
  formationForm: FormGroup;
  employees: any[] = [];

  constructor(
    private fb: FormBuilder,
    private service: FormationService,
    private userService: UserService,
    private router: Router,
  ) {
    this.formationForm = this.fb.group({
      title: ['', Validators.required],
      duration: ['', Validators.required],
      trainerId: ['', Validators.required], // ✅ seulement ça
      status: ['Planned'],
      date: [''],
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.userService.getEmployees().subscribe({
      next: (data) => {
        console.log('🔥 EMPLOYEES DATA =', data);
        this.employees = data;
        console.log('🔥 employees length =', this.employees.length);
      },
      error: (err) => {
        console.error('❌ API ERROR =', err);
      },
    });
  }
  onSubmit() {
    if (this.formationForm.invalid) return;

    const trainerId = Number(this.formationForm.value.trainerId);

    const data = {
      title: this.formationForm.value.title,
      duration: this.formationForm.value.duration,
      trainerId: isNaN(trainerId) ? null : trainerId,
      status: this.formationForm.value.status || 'Planned',
      date: this.formationForm.value.date
        ? new Date(this.formationForm.value.date)
        : null,
    };

    console.log('📦 FINAL DATA SENT =', data);

    this.service.create(data).subscribe({
      next: () => this.router.navigate(['/formations']),
      error: (err) => {
        console.error('❌ FULL ERROR =', err);
        console.error('❌ STATUS =', err.status);
        console.error('❌ BACKEND =', err.error);
      },
    });
  }
}

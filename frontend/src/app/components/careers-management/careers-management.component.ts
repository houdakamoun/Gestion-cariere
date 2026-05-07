import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CareerServiceService } from '../../services/career-service.service';

@Component({
  selector: 'app-career-management',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './careers-management.component.html',
  styleUrls: ['./careers-management.component.css'],
})
export class CareerManagementComponent implements OnInit {
  stats = {
    employees: 0,
    promotions: 0,
    departments: 0,
  };

  loading = true;
  error = false;

  constructor(private service: CareerServiceService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading = true;
    this.error = false;

    this.service.getCareerStats().subscribe({
      next: (data: any) => {
        this.stats = {
          employees: data?.employees ?? 0,
          promotions: data?.promotions ?? 0,
          departments: data?.departments ?? 0,
        };

        this.loading = false;
      },

      error: (err) => {
        console.error('Career stats error:', err);

        this.stats = {
          employees: 0,
          promotions: 0,
          departments: 0,
        };

        this.error = true;
        this.loading = false;
      },
    });
  }
}

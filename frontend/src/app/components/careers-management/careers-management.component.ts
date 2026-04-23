import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
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

  constructor(
    private router: Router,
    private service: CareerServiceService,
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.service.getCareerStats().subscribe((data: any) => {
      this.stats = data;
    });
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }
}

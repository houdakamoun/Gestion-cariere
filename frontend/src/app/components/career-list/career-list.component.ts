import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CareerServiceService } from '../../services/career-service.service';

@Component({
  selector: 'app-career-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './career-list.component.html',
  styleUrls: ['./career-list.component.css'],
})
export class CareerListComponent implements OnInit {
  careers: any[] = [];
  users: any[] = [];

  constructor(private service: CareerServiceService) {}

  ngOnInit(): void {
    this.loadCareers();
    this.loadUsers();
  }

  loadUsers(): void {
    this.service.getUsersWithSalary().subscribe({
      next: (res: any) => {
        console.log('users:', res); // debug
        this.users = res; // ✅ FIX
      },
      error: (err: any) => console.log(err),
    });
  }

  loadCareers(): void {
    this.service.getAllCareers().subscribe({
      next: (res: any) => {
        console.log('careers:', res); // debug
        this.careers = res; // ✅ FIX
      },
      error: (err: any) => {
        console.error('API error', err);
        this.careers = [];
      },
    });
  }
}

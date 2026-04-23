import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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

  constructor(
    private router: Router,
    private service: CareerServiceService,
  ) {}

  ngOnInit(): void {
    this.loadCareers();
  }

  loadCareers(): void {
    this.service.getAllCareers().subscribe({
      next: (data: any) => {
        this.careers = data;
      },
      error: (err) => {
        console.log('Backend not ready → using mock data');

        // 🔥 fallback (important pour toi maintenant)
        this.careers = [
          { id: 1, name: 'Ali', position: 'Developer', department: 'IT' },
          { id: 2, name: 'Sara', position: 'Designer', department: 'UX' },
          { id: 3, name: 'Amine', position: 'Manager', department: 'HR' },
        ];
      },
    });
  }

  viewDetail(id: number): void {
    this.router.navigate(['/career/detail', id]);
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CareerServiceService } from '../../services/career-service.service';

@Component({
  selector: 'app-career-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './career-detail.component.html',
  styleUrl: './career-detail.component.css',
})
export class CareerDetailComponent {
  career: any;

  users: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private service: CareerServiceService,
  ) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getCareerDetails(id).subscribe({
      next: (data: any) => {
        this.career = data.career;
        this.users = data.users;
      },
      error: (err) => console.log(err),
    });
  }
}

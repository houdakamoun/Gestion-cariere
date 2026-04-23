import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-career-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './career-timeline.component.html',
  styleUrls: ['./career-timeline.component.css'],
})
export class CareerTimelineComponent {
  // 🔥 mock data (remplacé plus tard par backend)
  timeline = [
    {
      date: '2022',
      position: 'Junior Developer',
      department: 'IT',
    },
    {
      date: '2023',
      position: 'Developer',
      department: 'IT',
    },
    {
      date: '2024',
      position: 'Senior Developer',
      department: 'IT',
    },
  ];
}

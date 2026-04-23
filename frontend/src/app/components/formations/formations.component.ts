import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormationService } from '../../services/formation.service';

@Component({
  selector: 'app-formations',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css'],
})
export class FormationsComponent implements OnInit {
  formations: any[] = [];

  constructor(private service: FormationService) {}

  ngOnInit(): void {
    this.loadFormations();
  }

  loadFormations(): void {
    console.log('🔥 loadFormations CALLED');

    this.service.getAll().subscribe({
      next: (data) => {
        console.log('✅ DATA FROM API:', data);
        this.formations = data;
      },
      error: (err) => {
        console.error('❌ ERROR API:', err);
      },
    });
  }
  filter(event: any) {
    const status = event.target.value;

    console.log('🎯 SELECTED STATUS:', status);

    if (!status || status === 'all') {
      console.log('➡️ GO LOAD ALL');
      this.loadFormations();
    } else {
      console.log('➡️ FILTER BY STATUS:', status);

      this.service.filterByStatus(status).subscribe({
        next: (data) => {
          console.log('✅ FILTER RESULT:', data);
          this.formations = data;
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
}

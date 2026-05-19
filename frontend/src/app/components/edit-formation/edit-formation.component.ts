import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormationService } from '../../services/formation.service';

@Component({
  selector: 'app-edit-formation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-formation.component.html',
  styleUrls: ['./edit-formation.component.css'],
})
export class EditFormationComponent implements OnInit {
  id!: number;

  formation: any = {
    title: '',
    duration: '',
    date: '',
    status: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: FormationService,
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getById(this.id).subscribe({
      next: (data: any) => {
        this.formation = {
          ...data,
          // ✅ format compatible input type="date"
          date: data.date
            ? new Date(data.date).toISOString().split('T')[0]
            : '',
        };
      },
      error: (err) => console.error('GET BY ID ERROR:', err),
    });
  }

  updateFormation() {
    const data = {
      title: this.formation.title,
      duration: String(this.formation.duration),
      date: this.formation.date,
      status: this.formation.status,
    };

    this.service.update(this.id, data).subscribe({
      next: () => {
        alert('Formation modifiée avec succès');
        this.router.navigate(['/formations']);
      },
      error: (err) => console.error(err),
    });
  }
}

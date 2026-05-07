import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assign-formation',
  templateUrl: './assign-formation.component.html',
  styleUrls: ['./assign-formation.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class AssignFormationComponent implements OnInit {
  users: any[] = [];
  formations: any[] = [];

  selectedUser: number | null = null;
  selectedFormation: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadFormations();
  }

  loadUsers() {
    this.http
      .get<any[]>('http://localhost:3000/users')
      .subscribe((data) => (this.users = data));
  }

  loadFormations() {
    this.http
      .get<any[]>('http://localhost:3000/api/formations')
      .subscribe((data) => (this.formations = data));
  }

  assign() {
    this.http
      .post('http://localhost:3000/assignment/assign-formation', {
        userId: this.selectedUser,
        formationId: this.selectedFormation,
      })
      .subscribe({
        next: () => {
          alert('✅ Assignation réussie');
        },
        error: (err) => {
          console.error(err);
          alert('❌ Erreur');
        },
      });
  }
}

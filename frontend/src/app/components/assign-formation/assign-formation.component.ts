import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { API_URL } from '../../core/api-url';

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
      .get<any[]>(`${API_URL}/users`)
      .subscribe((data) => (this.users = data));
  }

  loadFormations() {
    this.http
      .get<any[]>(`${API_URL}/api/formations`)
      .subscribe((data) => (this.formations = data));
  }

  assign() {
    this.http
      .post(`${API_URL}/assignment/assign-formation`, {
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

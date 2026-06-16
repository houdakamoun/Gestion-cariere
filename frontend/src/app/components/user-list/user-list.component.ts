import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { API_URL } from '../../core/api-url';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  readonly apiUrl = API_URL;
  users: any[] = [];

  // 🔥 stock temporaire des fichiers (IMPORTANT)
  selectedFiles: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // 📌 charger users + profile
  loadUsers() {
    this.http.get(`${API_URL}/users`).subscribe((res: any) => {
      this.users = res;
    });
  }

  // 📌 sélectionner fichier
  onFileChange(event: any, userId: number, type: string) {
    if (!this.selectedFiles[userId]) {
      this.selectedFiles[userId] = {};
    }

    this.selectedFiles[userId][type] = event.target.files[0];
  }

  // 📌 envoyer vers backend (profile)
  saveProfile(userId: number) {
    const formData = new FormData();

    const files = this.selectedFiles[userId];

    if (!files) {
      console.log('No files selected');
      return;
    }

    if (files.photo) {
      formData.append('photo', files.photo);
    }

    if (files.cv) {
      formData.append('cv', files.cv);
    }

    this.http
      .put(`${API_URL}/profiles/${userId}`, formData)
      .subscribe(() => {
        console.log('Profile updated ✔');
        this.loadUsers(); // refresh table
      });
  }
}

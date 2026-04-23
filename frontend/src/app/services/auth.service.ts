import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private apiUrl = 'http://localhost:3000';

  login(email: string, password: string) {
    return this.http.post<{ token: string; user: any }>(
      `${this.apiUrl}/auth/login`,
      { email, password },
    );
  }

  signup(data: any) {
    return this.http.post(`${this.apiUrl}/auth/signup`, data);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('connectedUser'); // sécurité

    this.router.navigate(['/login']).then(() => {
      window.location.reload(); // reset app state
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUser() {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getRole() {
    return this.getUser()?.role || '';
  }
}

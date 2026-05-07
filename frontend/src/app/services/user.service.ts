import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // USERS
  getUserById(id: number) {
    return this.http.get(`${this.apiUrl}/users/${id}`);
  }

  // PROFILE (PHOTO + CV)
  getProfile(id: number) {
    return this.http.get(`${this.apiUrl}/profiles/${id}`);
  }

  // EMPLOYEES
  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/employees`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // ✅ GET ALL EMPLOYEES (role = EMPLOYEE)
  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employees`);
  }
  getUserById(id: number | null | undefined) {
    if (!id) {
      console.warn('❌ ID USER NULL');
      return new Observable(); // évite crash
    }

    return this.http.get(`${this.apiUrl}/users/${id}`);
  }
}

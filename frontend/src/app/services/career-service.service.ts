import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CareerServiceService {
  private api = 'http://localhost:3000';
  private userApi = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  // 🔥 STATS DASHBOARD
  getCareerStats() {
    return this.http.get(`${this.api}/careers/stats`);
  }
  getAllCareers() {
    return this.http.get('http://localhost:3000/careers');
  }
  getCareerById(id: number) {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  // 🔵 USERS + SALARY
  getUsersWithSalary() {
    return this.http.get<any[]>(`${this.userApi}/with-salary`);
  }
  getCareerDetails(id: number) {
    return this.http.get(`${this.api}/details/${id}`);
  }
}

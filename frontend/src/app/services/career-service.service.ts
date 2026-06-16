import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../core/api-url';

@Injectable({
  providedIn: 'root',
})
export class CareerServiceService {
  private api = API_URL;
  private userApi = `${API_URL}/users`;

  constructor(private http: HttpClient) {}

  // 🔥 STATS DASHBOARD
  getCareerStats() {
    return this.http.get(`${this.api}/careers/stats`);
  }
  getAllCareers() {
    return this.http.get(`${API_URL}/careers`);
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

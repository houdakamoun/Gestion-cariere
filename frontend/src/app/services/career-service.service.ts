import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CareerServiceService {
  private api = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // 🔥 STATS DASHBOARD
  getCareerStats() {
    return this.http.get(`${this.api}/careers/stats`);
  }
  getAllCareers() {
    return this.http.get('http://localhost:3000/careers');
  }
}

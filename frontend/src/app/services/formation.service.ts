import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../core/api-url';

@Injectable({
  providedIn: 'root',
})
export class FormationService {
  private api = `${API_URL}/api/formations`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(this.api);
  }

  create(data: any) {
    return this.http.post(this.api, data);
  }

  update(id: number, data: any) {
    return this.http.put(`${this.api}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
  filterByStatus(status: string) {
    if (!status) {
      return this.getAll();
    }

    return this.http.get<any[]>(`${this.api}/filter?status=${status}`);
  }
  getStats() {
    return this.http.get<any>(`${API_URL}/formations/stats`);
  }
  getById(id: number) {
    return this.http.get(`${this.api}/${id}`);
  }
}

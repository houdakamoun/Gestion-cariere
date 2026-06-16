import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../core/api-url';

@Injectable({
  providedIn: 'root',
})
export class DepartmenteTsService {
  private api = `${API_URL}/api/departments`;
  constructor(private http: HttpClient) {}
  getDepartments() {
    return this.http.get<any[]>(this.api);
  }
}

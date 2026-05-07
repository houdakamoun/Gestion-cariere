import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DepartmenteTsService {
  private api = 'http://localhost:3000/api/departments';
  constructor(private http: HttpClient) {}
  getDepartments() {
    return this.http.get<any[]>(this.api);
  }
}

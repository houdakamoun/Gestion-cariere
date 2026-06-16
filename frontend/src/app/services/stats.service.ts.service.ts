// src/app/dashboard/services/stats.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../core/api-url';

export interface DashboardStats {
  metrics: {
    totalUsers: number;
    totalFormations: number;
    totalDepartments: number;
    totalCareers: number;
  };
  formationsByStatus: { status: string; _count: { status: number } }[];
  usersByRole: { role: string; _count: { role: number } }[];
  recentFormations: Formation[];
  departments: Department[];
  careers: Career[];
  employees: Employee[];
}

export interface Formation {
  id: number;
  title: string;
  duration: string;
  status: string;
  date: string | Date;
  createdAt?: string | Date;
  trainer?: { nom: string; prenom: string };
}

export interface Department {
  id: number;
  name: string;
}

export interface Career {
  id: number;
  title: string;
  position: string;
  department: string;
  description: string;
  baseSalary: number;
}

export interface Employee {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  position: string;
  department: string;
  hireDate: string;
}

@Injectable({ providedIn: 'root' })
export class StatsService {
  private apiUrl = `${API_URL}/api`;

  constructor(private http: HttpClient) {}

  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/stats`);
  }

  getFormations(status?: string): Observable<Formation[]> {
    const url = status
      ? `${this.apiUrl}/formations?status=${status}`
      : `${this.apiUrl}/formations`;
    return this.http.get<Formation[]>(url);
  }
}

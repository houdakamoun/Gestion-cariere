import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  DashboardStats,
  Formation,
  Department,
  Employee,
} from '../../services/stats.service.ts.service';

import { Chart, registerables } from 'chart.js';
import { StatsService } from '../../services/stats.service.ts.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats | null = null;
  loading = true;

  activeTab = 'overview';
  activeFilter = 'all';
  filteredFormations: Formation[] = [];

  private donutChart: Chart | null = null;
  private barChart: Chart | null = null;

  statusLabel: Record<string, string> = {
    Completed: 'Terminée',
    'In Progress': 'En cours',
    Planned: 'Planifiée',
  };

  roleLabel: Record<string, string> = {
    ADMIN: 'Admin',
    RH: 'RH',
    EMPLOYEE: 'Employé',
  };

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.statsService.getStats().subscribe({
      next: (data: DashboardStats) => {
        console.log('STATS API:', data);

        this.stats = data;
        this.filteredFormations = data.recentFormations ?? [];
        this.loading = false;

        // FIX IMPORTANT: DOM ready
        setTimeout(() => {
          this.buildDonutChart();
          this.buildBarChart();
        }, 150);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  // =======================
  // TABS (INCHANGÉ + FIX)
  // =======================
  setTab(tab: string): void {
    this.activeTab = tab;

    if (tab === 'employees') {
      console.log('EMPLOYEES:', this.stats?.employees);
    }

    if (tab === 'formations') {
      this.filteredFormations = this.stats?.recentFormations ?? [];
    }

    setTimeout(() => {
      if (tab === 'overview') {
        this.buildDonutChart();
        this.buildBarChart();
      }

      if (tab === 'departments') {
        this.buildBarChart();
      }
    }, 100);
  }

  // =======================
  // FILTER FORMATIONS (INCHANGÉ)
  // =======================
  filterFormations(status: string): void {
    this.activeFilter = status;

    if (!this.stats) return;

    this.filteredFormations =
      status === 'all'
        ? (this.stats.recentFormations ?? [])
        : (this.stats.recentFormations ?? []).filter(
            (f) => f.status === status,
          );
  }

  // =======================
  // HELPERS (INCHANGÉ)
  // =======================
  getStatusClass(status: string): string {
    return (
      {
        Completed: 'badge-success',
        'In Progress': 'badge-info',
        Planned: 'badge-warning',
      }[status] ?? 'badge-gray'
    );
  }

  getRoleClass(role: string): string {
    return (
      {
        ADMIN: 'badge-info',
        RH: 'badge-warning',
        EMPLOYEE: 'badge-gray',
      }[role] ?? 'badge-gray'
    );
  }

  getInitials(nom: string, prenom: string): string {
    return (prenom?.[0] ?? '') + (nom?.[0] ?? '');
  }

  // =======================
  // COUNTERS (INCHANGÉ)
  // =======================
  countByStatus(status: string): number {
    return (
      this.stats?.formationsByStatus?.find((item) => item.status === status)
        ?._count?.status ?? 0
    );
  }

  countByRole(role: string): number {
    return (
      this.stats?.usersByRole?.find((item) => item.role === role)?._count
        ?.role ?? 0
    );
  }

  rolePercent(role: string): number {
    if (!this.stats) return 0;

    const total =
      this.stats.usersByRole?.reduce(
        (sum, r) => sum + (r._count?.role ?? 0),
        0,
      ) ?? 0;

    if (!total) return 0;

    return Math.round((this.countByRole(role) / total) * 100);
  }

  getEmployeeCount(deptName: string): number {
    if (!this.stats?.employees) return 0;

    return this.stats.employees.filter(
      (e: Employee) => e.department === deptName,
    ).length;
  }

  // =======================
  // DONUT CHART (FIX SAFE)
  // =======================
  private buildDonutChart(): void {
    const canvas = document.getElementById('donutChart') as HTMLCanvasElement;
    if (!canvas || !this.stats) return;

    this.donutChart?.destroy();

    this.donutChart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Terminées', 'En cours', 'Planifiées'],
        datasets: [
          {
            data: [
              this.countByStatus('Completed'),
              this.countByStatus('In Progress'),
              this.countByStatus('Planned'),
            ],
            backgroundColor: ['#639922', '#378ADD', '#BA7517'],
          },
        ],
      },
      options: {
        cutout: '68%',
        plugins: { legend: { display: false } },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  // =======================
  // BAR CHART (FIX SAFE)
  // =======================
  private buildBarChart(): void {
    const canvas = document.getElementById('deptChart') as HTMLCanvasElement;
    if (!canvas || !this.stats) return;

    this.barChart?.destroy();

    const deptNames = this.stats.departments?.map((d) => d.name) ?? [];

    const deptCounts =
      this.stats.departments?.map(
        (d) =>
          this.stats!.employees.filter((e: Employee) => e.department === d.name)
            .length,
      ) ?? [];

    this.barChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: deptNames,
        datasets: [
          {
            label: 'Employés',
            data: deptCounts,
            backgroundColor: [
              '#378ADD',
              '#1D9E75',
              '#D4537E',
              '#EF9F27',
              '#E24B4A',
              '#7F77DD',
            ],
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1 } },
          x: { grid: { display: false } },
        },
      },
    });
  }
}

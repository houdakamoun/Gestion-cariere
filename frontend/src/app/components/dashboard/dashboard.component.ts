import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  role: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getUser(); // ✅ IMPORTANT

    console.log('USER FROM STORAGE:', user);

    this.role = (user?.role || '').trim().toUpperCase();

    console.log('ROLE FINAL:', this.role);
  }
}

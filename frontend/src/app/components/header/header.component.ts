import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';

import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatTooltipModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  connectedUser: any = null;

  role: string = '';

  constructor(
    private router: Router,
    public auth: AuthService,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const user = this.auth.getUser(); // 👈 on centralise ici

      if (user) {
        this.connectedUser = user;
        this.role = (user.role || '').toUpperCase().trim();
      }
    }
  }

  isLogged(): boolean {
    return this.auth.isLoggedIn(); // 👈 plus de localStorage direct
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

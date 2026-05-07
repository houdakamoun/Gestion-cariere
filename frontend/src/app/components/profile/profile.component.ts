import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, QRCodeModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;
  profile: any;
  formations: any[] = [];
  constructor(
    private userService: UserService,
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = Number(params['id']);

      if (id) {
        this.loadUser(id);
        return;
      }

      const data = localStorage.getItem('user');
      if (!data) return;

      const connectedUser = JSON.parse(data);

      if (!connectedUser?.id) return;

      this.loadUser(connectedUser.id);
    });
  }

  loadUser(id: number) {
    // 👤 USER INFO
    this.userService.getUserById(id).subscribe({
      next: (res: any) => {
        this.user = res;
      },
      error: (err) => console.error('User error:', err),
    });

    // 📁 PROFILE (photo + cv)
    this.userService.getProfile(id).subscribe({
      next: (res: any) => {
        this.profile = res;
      },
      error: (err) => console.error('Profile error:', err),
    });

    // 🎓 FORMATIONS
    this.loadUserFormations(id);
  }

  loadUserFormations(userId: number) {
    this.http
      .get<any[]>(`http://localhost:3000/assignment/user/${userId}`)
      .subscribe((data: any[]) => {
        this.formations = data;
      });
  }
}

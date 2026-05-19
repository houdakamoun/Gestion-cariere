import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormationService } from '../../services/formation.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-formations',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css'],
})
export class FormationsComponent implements OnInit {
  formations: any[] = [];

  videos: any[] = [];
  selectedVideo: SafeResourceUrl | null = null;

  constructor(
    private service: FormationService,
    private sanitizer: DomSanitizer,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadFormations();

    // 🔥 force refresh à chaque retour sur la page
    this.router.events.subscribe(() => {
      this.loadFormations();
    });
  }

  loadFormations(): void {
    this.service.getAll().subscribe({
      next: (data) => (this.formations = data),
      error: (err) => console.error(err),
    });
  }

  filter(event: any) {
    const status = event.target.value;

    if (!status) {
      this.loadFormations();
    } else {
      this.service.filterByStatus(status).subscribe({
        next: (data) => (this.formations = data),
        error: (err) => console.error(err),
      });
    }
  }

  // 🎥 OPEN VIDEO
  openVideo(url: string) {
    this.selectedVideo = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  closeVideo() {
    this.selectedVideo = null;
  }

  // ✏️ EDIT
  editFormation(id: number) {
    this.router.navigate(['/edit-formation', id]);
  }

  // 🗑 DELETE
  deleteFormation(id: number) {
    const confirmDelete = confirm(
      'Are you sure you want to delete this formation?',
    );

    if (confirmDelete) {
      this.service.delete(id).subscribe({
        next: () => {
          this.formations = this.formations.filter((f) => f.id !== id);
        },
        error: (err) => console.error(err),
      });
    }
  }
}

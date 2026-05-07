import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
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
  ) {}

  ngOnInit(): void {
    this.loadFormations();

    // 🎥 VIDEOS (tu peux plus tard les récupérer depuis backend)
    this.videos = [
      {
        title: 'Angular Basics',
        duration: '10 min',
        url: 'https://www.youtube.com/embed/2OHbjep_WjQ',
        thumbnail: 'https://img.youtube.com/vi/2OHbjep_WjQ/0.jpg',
      },
      {
        title: 'React Tutorial',
        duration: '12 min',
        url: 'https://www.youtube.com/embed/w7ejDZ8SWv8',
        thumbnail: 'https://img.youtube.com/vi/w7ejDZ8SWv8/0.jpg',
      },
      {
        title: 'Spark Introduction',
        duration: '8 min',
        url: 'https://www.youtube.com/embed/_C8kWso4ne4',
        thumbnail: 'https://img.youtube.com/vi/_C8kWso4ne4/0.jpg',
      },
    ];
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

  // 🎥 OPEN VIDEO (MODAL)
  openVideo(url: string) {
    this.selectedVideo = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  closeVideo() {
    this.selectedVideo = null;
  }
}

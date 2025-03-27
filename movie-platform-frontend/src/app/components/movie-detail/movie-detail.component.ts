import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from './delete-confirmation.component';


@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatCardModule, MatIconModule,MatDialogModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: any = {};

  constructor(private route: ActivatedRoute, private movieService: MovieService, private router: Router,  private dialog: MatDialog) {}

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];

    try {
      this.movie = await this.movieService.getMovie(id);
      console.log('Movie details:', this.movie);
    } catch (error) {
      console.error('Error fetching movie:', error);
    }
  }

  getVideoUrl(): string {
    return this.movie.video_file ? `http://127.0.0.1:8000${this.movie.video_file}` : '';
  }
  deleteMovie() {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '350px',
      data: { movieTitle: this.movie.title }
    });

    dialogRef.afterClosed().subscribe(async (confirmed) => {
      if (confirmed) {
        try {
          await this.movieService.deleteMovie(this.movie.id);
          alert('Movie deleted successfully!');
          this.router.navigate(['/']); // ✅ Redirect after deletion
        } catch (error) {
          console.error('Error deleting movie:', error);
          alert('Failed to delete movie.');
        }
      }
    });
  }
}
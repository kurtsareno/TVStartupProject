import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule
  ],
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css'],
})
export class MovieFormComponent implements OnInit {
  movieForm: FormGroup;
  selectedFileName: string = 'No file chosen';
  movieId: number | null = null;
  isEditMode = false;

  constructor(private http: HttpClient, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      video_file: [null]
    });
  }

  async ngOnInit() {
    this.movieId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.movieId;

    if (this.isEditMode) {
      try {
        const movie = await this.http.get<any>(`http://127.0.0.1:8000/api/movies/${this.movieId}/`).toPromise();
        this.movieForm.patchValue({
          title: movie.title,
          description: movie.description,
        });
      } catch (error) {
        console.error('Error loading movie:', error);
      }
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.movieForm.patchValue({ video_file: file });
    }
  }

  submitMovie() {
    if (this.movieForm.valid) {
      const formData = new FormData();
      formData.append('title', this.movieForm.get('title')?.value);
      formData.append('description', this.movieForm.get('description')?.value);

      const fileInput = this.movieForm.get('video_file')?.value;
      if (fileInput instanceof File) {
        formData.append('video_file', fileInput);
      }

      if (this.isEditMode) {
        this.http.put(`http://127.0.0.1:8000/api/movies/${this.movieId}/`, formData).subscribe(
          () => this.router.navigate(['/']),
          (error) => console.error('Error updating movie:', error)
        );
      } else {
        this.http.post('http://127.0.0.1:8000/api/movies/', formData).subscribe(
          () => this.router.navigate(['/']),
          (error) => console.error('Error adding movie:', error)
        );
      }
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
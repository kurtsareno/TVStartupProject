import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule], // Add HttpClientModule here
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.http.get<any[]>('http://127.0.0.1:8000/api/movies/').subscribe(
      (data) => {
        this.movies = data;
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }
}
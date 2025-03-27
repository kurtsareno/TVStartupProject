import axios from 'axios';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private API_URL = 'http://127.0.0.1:8000/api/movies/';

  async getMovies() {
    return (await axios.get(this.API_URL)).data;
  }

  async getMovie(id: number) {
    return (await axios.get(`${this.API_URL}${id}/`)).data;
  }

  async addMovie(movie: FormData) {
    return (await axios.post(this.API_URL, movie, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })).data;
  }

  async updateMovie(id: number, movie: FormData) {
    return (await axios.put(`${this.API_URL}${id}/`, movie, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })).data;
  }

  async deleteMovie(id: number) {
    return (await axios.delete(`${this.API_URL}${id}/`)).data;
  }
}
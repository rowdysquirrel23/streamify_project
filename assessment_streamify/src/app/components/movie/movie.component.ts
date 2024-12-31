import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie',
  standalone: false,
  
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {
  movies: any[] = [];
  filteredMovies: any[] = [];
  searchTerm: string = '';
  searchCategory: string = 'title'; // Default search category

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((data: any) => {
      this.movies = data.movies;
      this.filteredMovies = this.movies; // Initially show all movies
    });
  }

  searchMovies(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredMovies = this.movies.filter((movie) => {
      if (this.searchCategory === 'title') {
        return movie.title.toLowerCase().includes(term);
      } else if (this.searchCategory === 'genre') {
        return movie.genre.toLowerCase().includes(term);
      } else if (this.searchCategory === 'rating') {
        return movie.rating.toString().includes(term);
      }
      return false;
    });
  }
}

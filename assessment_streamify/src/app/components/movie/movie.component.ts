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
  searchTerm: string = ''; // For manual keyboard search
  selectedTitle: string = ''; // Title selection from dropdown
  selectedGenre: string = ''; // Genre selection from dropdown
  selectedRating: string = 'highest'; // Rating sorting, default to highest
  allTitles: string[] = [];
  allGenres: string[] = [];
  allRatings: string[] = ['highest', 'lowest']; // Sort options for ratings
  hasSearched: boolean = false; // Flag to track if a search has been performed

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    // Load all movies on init but do not display them
    this.movieService.getMovies().subscribe((data: any) => {
      this.movies = data.movies;

      this.allTitles = [...new Set(this.movies.map((movie) => movie.title))];
      this.allGenres = [...new Set(this.movies.map((movie) => movie.genre))];
    });
  }

  searchMovies(): void {
    // Mark that a search has been performed
    this.hasSearched = true;

    let result = this.movies;

    // manual search
    if (this.searchTerm) {
      result = result.filter((movie) =>
        movie.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        movie.genre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        movie.rating.toString().includes(this.searchTerm)
      );
    }

    // title sorting
    if (this.selectedTitle) {
      result = result.filter((movie) => movie.title === this.selectedTitle);
    }

    // genre sorting
    if (this.selectedGenre) {
      result = result.filter((movie) => movie.genre === this.selectedGenre);
    }

    // ratings sorting
    if (this.selectedRating === 'highest') {
      result = result.sort((a, b) => b.rating - a.rating);
    } else if (this.selectedRating === 'lowest') {
      result = result.sort((a, b) => a.rating - b.rating);
    }

    // Update filteredMovies to reflect changes
    this.filteredMovies = result;
  }
}

import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie',
  standalone: false,
  
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {
  //allow for the search components to work
  movies: any[] = [];
  filteredMovies: any[] = [];
  searchTerm: string = ''; 
  selectedTitle: string = ''; 
  selectedGenre: string = ''; 
  selectedRating: string = 'highest';
  allTitles: string[] = [];
  allGenres: string[] = [];
  allRatings: string[] = ['highest', 'lowest']; 

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    // Load all movies
    this.movieService.getMovies().subscribe((data: any) => {
      this.movies = data.movies;
      this.filteredMovies = this.movies;

      
      this.allTitles = [...new Set(this.movies.map((movie) => movie.title))];
      this.allGenres = [...new Set(this.movies.map((movie) => movie.genre))];
    });
  }

  searchMovies(): void {
    let result = this.movies;

    // Manual search
    if (this.searchTerm) {
      result = result.filter((movie) =>
        movie.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        movie.genre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        movie.rating.toString().includes(this.searchTerm)
      );
    }

    // Select title 
    if (this.selectedTitle) {
      result = result.filter((movie) => movie.title === this.selectedTitle);
    }

    // select genre
    if (this.selectedGenre) {
      result = result.filter((movie) => movie.genre === this.selectedGenre);
    }

    // rating sorting
    if (this.selectedRating === 'highest') {
      result = result.sort((a, b) => b.rating - a.rating);
    } else if (this.selectedRating === 'lowest') {
      result = result.sort((a, b) => a.rating - b.rating);
    }

    
    this.filteredMovies = result;
  }
}

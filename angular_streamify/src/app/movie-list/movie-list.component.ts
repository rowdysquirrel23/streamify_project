import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movie-list',
  // imports: [],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})


export class MovieListComponent implements OnInit {

  
  movies: Movie[] = [];  // Specify the type of the array
  filteredMovies: Movie[] = [];  // Specify the type of the array
  genres = ['Action', 'Sci-Fi', 'Crime', 'Drama', 'History', 'Fantasy', 'Romance'];  // Example genres
  rating: number = 0;
  title: string = '';
  genre: string = '';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((data: Movie[]) => {
      this.movies = data;
      this.filteredMovies = data;
    });
  }

  searchMovies() {
    this.filteredMovies = this.movies.filter((movie) => {
      return (
        (this.title ? movie.title.toLowerCase().includes(this.title.toLowerCase()) : true) &&
        (this.genre ? movie.genre.toLowerCase() === this.genre.toLowerCase() : true) &&
        (this.rating ? movie.rating >= this.rating : true)
      );
    });
  }
}

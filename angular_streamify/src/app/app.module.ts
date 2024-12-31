import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // For two-way data binding
import { HttpClientModule } from '@angular/common/http';  // For making HTTP requests
import { AppComponent } from './app.component';  // The root component
import { MovieListComponent } from './movie-list/movie-list.component';  // Your movie list component
import { MovieService } from './movie.service';  // Service to fetch movie data

@NgModule({
  declarations: [
    AppComponent,  // Declaring the root component
    MovieListComponent  // Declaring the movie list component
  ],
  imports: [
    BrowserModule,  // Importing the browser module for browser compatibility
    FormsModule,  // Importing forms module for two-way binding
    HttpClientModule  // Importing HTTP client module for fetching movie data
  ],
  providers: [MovieService],  // Registering the movie service
  bootstrap: [AppComponent]  // Bootstrap the root component to launch the app
})
export class AppModule { }
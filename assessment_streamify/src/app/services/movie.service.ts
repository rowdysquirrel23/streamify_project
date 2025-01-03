import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
//locate the dummy api/JSON file
  private jsonUrl = 'assets/movies.json';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any> {
    return this.http.get(this.jsonUrl);
  }
}

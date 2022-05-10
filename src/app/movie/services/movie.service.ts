import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MovieGenre } from '../models/movieGenre';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  
  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    const list = this.http.get<Movie[]>(environment.urlMovie);
    const filterList = list.pipe(
      map((x: Movie[]) => {
        x.forEach(y => y.poster_path = environment.urlMovieBase.concat('/', y.poster_path!));
        return x;
      })
    );
    return filterList;
  }

  getMoviebyID(id: number): Observable<Movie> {
    if (id === 0)
      return of(this.initializeMovie());

    let url = (`${environment.urlMovie}/${id}`);
    return this.http.get<Movie>(url)
      .pipe(
        tap(data => console.log('getMovie: ' + JSON.stringify(data)))
      );
  }

  updateMovie(movie: Movie): Observable<Movie> {
    let url = (`${environment.urlMovie}/${movie.id}`);
    return this.http.patch<Movie>(url, movie).pipe(
      catchError((err) => {
        throw err;
      }));
  }

  createMovie(movie: Movie): Observable<Movie> {    
    movie.id = 0;
    return this.http.post<Movie>(environment.urlMovie, movie)
      .pipe(
        tap(data => console.log('createMovie: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  
  deleteMovie(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.urlMovie}/${id}`);
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
  
  getMovieGenresList(): Observable<MovieGenre[]> {
    return this.http.get<MovieGenre[]>(environment.urlMovieGenre);
  }
  
  private initializeMovie(): Movie {
    // Return an initialized object
    let movie: Movie = {
      genre_id: 0,
      id: 0,
      date: '',
      title: '',
      rating: 0,
      genreTitle: ''
    };
    return movie;
  }

}

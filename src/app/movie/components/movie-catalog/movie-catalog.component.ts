import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subscription, tap } from 'rxjs';
import { LoginService } from 'src/app/login/services/login.service';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie-catalog.component.html',
  styleUrls: ['./movie-catalog.component.css']
})
export class MovieCatalogComponent implements OnInit, OnDestroy {

  sub: Subscription | undefined;
  listMovie: Movie[] | undefined;
  selectedMovie: Movie | undefined;
  titleFilter: string | undefined;

  constructor(private router: Router,
              private loginService: LoginService,
              private movieService: MovieService) { }

  ngOnInit(): void {

    this.loginService.checkUser();

    this.sub = this.movieService.getMovies().subscribe({
      next: (data: any) => {
        this.listMovie = data;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
    // this.listMovie = dummyMovies;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
  }

  showRating(event: any) {
    console.log(event);
  }

  openMovie(movie: Movie) {
    this.router.navigate(['movie-detail/' + movie.id]);
  }

  addMovie() {
    this.router.navigate(['movie-detail/new']);
  }

  applyFilter() {
    let titleFilter: string = '';
    if (this.titleFilter != null)
      titleFilter = this.titleFilter!.toUpperCase();

    //sample #1: tap & filtering
    var b = this.movieService.getMovies().pipe(
      tap(u => console.log(u)),
      map(t =>
        t.filter((y: Movie) => y.title!.toUpperCase().indexOf(titleFilter) != -1)
      )
    );
    this.sub = b.subscribe(t => this.listMovie = t);

    //sample #2: cast emitted values
    let myArray: Observable<(string | undefined)[]>;
    myArray = this.movieService.getMovies().pipe(
      map((x: Movie[]) => x.filter
        ((y: Movie) => y.title?.toUpperCase().indexOf(titleFilter) != -1)
      ),
      map((a: Movie[]) => {
        return a.map((i: Movie) => i.title);
      }
      )
    );
    myArray.subscribe(t => console.log(t));
  }

}

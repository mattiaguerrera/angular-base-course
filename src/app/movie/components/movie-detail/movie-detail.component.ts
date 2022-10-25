import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from '../../models/movie';
import { MovieGenre } from '../../models/movieGenre';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
  providers: [DatePipe]
})
export class MovieDetailComponent implements OnInit {

  sub: Subscription | undefined;
  pageTitle: string = 'Add Movie';
  movie: Movie | null = null;
  movieList: Movie[] = [];
  newMovie: boolean = false;
  movieDate: string | undefined;
  movieGenres: MovieGenre[] = [];
  movieGenreId: number = 0;

  @ViewChild("movieForm") private movieForm: NgForm | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private movieService: MovieService) { }

  ngOnInit(): void {
    // Read the product Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      () => {
        let id: number = 0;
        const param = String(this.route.snapshot.paramMap.get('id'));
        id = Number(param);
        if (typeof param == 'string' && param === 'new') {
          this.newMovie = true
          id = 0;
        }
        this.getMovie(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  getMovie(id: number): void {
    this.sub = this.movieService.getMoviebyID(id)
      .subscribe({
        next: (data: Movie) => { this.displayMovie(data); },
        error: err => { console.log(err); }
      });
  }

  displayMovie(m: Movie): void {
    if (this.movieForm) {
      this.movieForm.reset();
    }
    this.movie = m;
    this.movieDate = this.datePipe.transform(this.movie.date, "dd/MM/yyyy")?.toString();

    if (m.genre_id) {
      this.sub = this.movieService.getMovieGenresList().subscribe(
        data => {
          if (data) {
            this.movieGenres = data;
            const myGenre = this.movieGenres.filter(
              (genre) => genre.id == m.genre_id
            );
            if (myGenre)
              this.movieGenreId = myGenre[0].id;
          }
        }
      );
    }
  }

  onSubmit() {
    if (this.movieForm?.valid) {
      if (this.movieForm.dirty) {
        const m = { ...this.movie, ...this.movieForm.value }; //override movie fields with values of form edited
        if (m.id === 0) {
          m.id = Math.floor(Math.random() * 100000);
          this.movieService.createMovie(m)
            .subscribe({
              next: x => {
                console.log(x);
                return this.onSaveComplete();
              },
              error: err => alert(err)
            });
        } else {
          const dateSplit = m.date.split('/');
          const dateConcat = (dateSplit[2] + '-' + dateSplit[1] + '-' + dateSplit[0]);
          const date = new Date(dateConcat);
          m.date = this.datePipe.transform(date, 'yyyy-MM-dd');
          m.genre_id = +m.genre_id;
          this.movieService.updateMovie(m)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => alert(err)
            });
        }
      }
    } else {
      alert('Please correct the validation errors');
    }
  }

  deleteMovie(): void {
    if (this.movie?.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else if (this.movie!.id) {
      if (confirm(`Really delete the movie: ${this.movie!.title}?`)) {
        this.sub = this.movieService.deleteMovie(this.movie!.id).subscribe({
          next: () => this.onDeleteComplete(),
          error: (err: any) => alert(err)
        }
        );
      }
    }
  }

  resetForm() {
    //gestisco un cast ad any perché devo gestire la property genre che non appartiene alla classe Movie
    const m: any = {
      id: 0,
      date: '',
      title: '',
      rating: 0,
      note: '',
      genre: '',
      genre_id: 0
    }
    this.newMovie = true;
    this.movieForm?.reset(
      this.movieForm?.setValue(m)
    );
  }

  onSaveComplete(): void {
    setTimeout(() => {
      this.movieForm!.reset();
      alert('Movie saved!');
      this.router.navigate(['/movie-catalog']);
    }, 1000);
  }
  
  onDeleteComplete(): void {
    setTimeout(() => {
      this.movieForm!.reset();
      alert('Movie deleted!');
      this.router.navigate(['/movie-catalog']);
    }, 1000);
  }

}


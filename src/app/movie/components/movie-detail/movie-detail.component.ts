// movie-detail.component.ts
import { DatePipe } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from '../../models/movie';
import { MovieGenre } from '../../models/movieGenre';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
  providers: [DatePipe],
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  sub: Subscription | undefined;
  pageTitle: string = 'Add Movie';
  movie: Movie | null = null;
  movieList: Movie[] = [];
  newMovie: boolean = false;
  movieGenres: MovieGenre[] = [];
  movieForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private movieService: MovieService,
    private fb: FormBuilder
  ) {
    // Inizializzazione del form con validatori
    this.movieForm = this.fb.group({
      id: [{ value: 0, disabled: true }],
      title: ['', [Validators.required, Validators.minLength(4)]],
      date: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/
          ),
        ],
      ],
      rating: [
        '',
        [Validators.required, Validators.pattern(/^[0-5]+([\,\.][0-9]+)?$/)],
      ],
      note: [''],
      genre_id: [0],
    });
  }

  ngOnInit(): void {
    // Read the product Id from the route parameter
    this.sub = this.route.paramMap.subscribe(() => {
      let id: number = 0;
      const param = String(this.route.snapshot.paramMap.get('id'));
      id = Number(param);
      if (typeof param == 'string' && param === 'new') {
        this.newMovie = true;
        id = 0;
      }
      this.getMovie(id);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  getMovie(id: number): void {
    this.sub = this.movieService.getMoviebyID(id).subscribe({
      next: (data: Movie) => {
        this.displayMovie(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  displayMovie(m: Movie): void {
    this.movieForm.reset();
    this.movie = m;

    const formattedDate = this.datePipe.transform(m.date, 'dd/MM/yyyy');

    // Popola il form con i dati del movie
    this.movieForm.patchValue({
      id: m.id,
      title: m.title,
      date: formattedDate,
      rating: m.rating,
      note: m.note,
      genre_id: m.genre_id || 0,
    });

    if (m.genre_id) {
      this.sub = this.movieService.getMovieGenresList().subscribe((data) => {
        if (data) {
          this.movieGenres = data;
          // Aggiorna il valore del genere nel form
          this.movieForm.patchValue({
            genre_id: m.genre_id,
          });
        }
      });
    } else {
      // Carica comunque la lista dei generi anche per i nuovi movie
      this.sub = this.movieService.getMovieGenresList().subscribe((data) => {
        if (data) {
          this.movieGenres = data;
        }
      });
    }
  }

  onSubmit(): void {
    if (this.movieForm.valid) {
      if (this.movieForm.dirty) {
        // Ottieni i valori dal form (inclusi i controlli disabilitati)
        const formValue = {
          ...this.movieForm.value,
          ...this.movieForm.getRawValue(),
        };
        const m = { ...this.movie, ...formValue };

        if (m.id === 0) {
          m.id = Math.floor(Math.random() * 100000);
          this.movieService.createMovie(m).subscribe({
            next: (x) => {
              console.log(x);
              return this.onSaveComplete();
            },
            error: (err) => alert(err),
          });
        } else {
          const dateSplit = m.date.split('/');
          const dateConcat =
            dateSplit[2] + '-' + dateSplit[1] + '-' + dateSplit[0];
          const date = new Date(dateConcat);
          m.date = this.datePipe.transform(date, 'yyyy-MM-dd');
          m.genre_id = +m.genre_id;
          this.movieService.updateMovie(m).subscribe({
            next: () => this.onSaveComplete(),
            error: (err) => alert(err),
          });
        }
      }
    } else {
      alert('Please correct the validation errors');
    }
  }

  deleteMovie(): void {
    if (this.movie?.id === 0) {
      this.onSaveComplete();
    } else if (this.movie!.id) {
      if (confirm(`Really delete the movie: ${this.movie!.title}?`)) {
        this.sub = this.movieService.deleteMovie(this.movie!.id).subscribe({
          next: () => this.onDeleteComplete(),
          error: (err: any) => alert(err),
        });
      }
    }
  }

  resetForm(): void {
    const defaultValues = {
      id: 0,
      date: '',
      title: '',
      rating: '',
      note: '',
      genre_id: 0,
    };

    this.newMovie = true;
    this.movieForm.reset(defaultValues);
  }

  onSaveComplete(): void {
    setTimeout(() => {
      this.movieForm.reset();
      alert('Movie saved!');
      this.router.navigate(['/movie-catalog']);
    }, 1000);
  }

  onDeleteComplete(): void {
    setTimeout(() => {
      this.movieForm.reset();
      alert('Movie deleted!');
      this.router.navigate(['/movie-catalog']);
    }, 1000);
  }

  // Getter per facilitare l'accesso ai controlli nel template
  get title() {
    return this.movieForm.get('title');
  }
  get date() {
    return this.movieForm.get('date');
  }
  get rating() {
    return this.movieForm.get('rating');
  }
  get note() {
    return this.movieForm.get('note');
  }
  get id() {
    return this.movieForm.get('id');
  }
  get genre_id() {
    return this.movieForm.get('genre_id');
  }
}

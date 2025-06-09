// movie-detail.component.ts
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { dummyMovies } from '../../models/dummy-movie';
import { Movie } from '../../models/movie';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
  providers: [DatePipe],
})
export class MovieDetailComponent implements OnInit {
  pageTitle: string = 'Movie Detail';
  movie: Movie | null = null;
  movieList: Movie[] = [];
  newMovie: boolean = false;
  movieForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private fb: FormBuilder
  ) {
    // Inizializzazione del form con validatori
    this.movieForm = this.fb.group({
      id: [{ value: '', disabled: true }],
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
        [
          Validators.required,
          Validators.pattern(
            /^(0(\.[0-9]{1,2})?|[1-4](\.[0-9]{1,2})?|5(\.00?)?)$/
          ),
        ],
      ],
      note: [''],
    });
  }

  ngOnInit(): void {
    this.movieList = dummyMovies;
    const id = this.route.snapshot.params['id'];
    console.log(id);
    console.log(typeof id);

    if (id !== undefined) {
      if (id == 'new') {
        this.newMovie = true;
        this.setDefaultForm();
      } else {
        const m = dummyMovies.filter((m) => m.id === parseInt(id))[0];
        this.movie = JSON.parse(JSON.stringify(m));
        this.populateForm();
      }
    }
  }

  populateForm(): void {
    if (this.movie) {
      const formattedDate = this.datePipe.transform(
        this.movie.date,
        'dd/MM/yyyy'
      );

      this.movieForm.patchValue({
        id: this.movie.id,
        title: this.movie.title,
        date: formattedDate,
        rating: this.movie.rating,
        note: this.movie.note,
      });
    }
  }

  setDefaultForm(): void {
    this.movie = {
      id: -1,
      title: '',
      genere: '',
      rating: 0,
      date: new Date(),
    };

    this.movieForm.patchValue({
      id: -1,
      title: '',
      date: '',
      rating: '',
      note: '',
    });
  }

  onSubmit(): void {
    if (this.movieForm.valid) {
      this.onSaveComplete();
    }
  }

  deleteMovie(): void {
    if (this.movie?.id === 0) {
      this.onSaveComplete();
    } else if (this.movie!.id) {
      if (confirm(`Really delete the movie: ${this.movie!.title}?`)) {
        setTimeout(() => alert('Movie deleted!'), 1000);
        setTimeout(() => this.router.navigate(['/movie-catalog']), 1000);
      }
    }
  }

  resetForm(): void {
    this.movieForm.reset();
    if (this.movie) {
      this.populateForm();
    }
  }

  onSaveComplete(): void {
    setTimeout(() => {
      this.movieForm.reset();
      alert('Movie saved!');
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
}

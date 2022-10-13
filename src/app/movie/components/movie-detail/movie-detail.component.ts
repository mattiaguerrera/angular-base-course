import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { dummyMovies } from '../../models/dummy-movie';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
  providers: [DatePipe]
})
export class MovieDetailComponent implements OnInit {

  pageTitle: string = 'Movie Detail';
  movie: Movie | null = null;
  movieList: Movie[] = [];
  newMovie: boolean = false;
  movieDate: string | undefined;

  @ViewChild("movieForm") private movieForm: NgForm | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.movieList = dummyMovies;
    const id = this.route.snapshot.params['id'];
    console.log(id);
    console.log(typeof(id));
    if (id !== undefined) {
      if (id == 'new') {
        this.newMovie = true;
        this.setDefaultForm();
      } else {
        const m = dummyMovies.filter(m => m.id === parseInt(id))[0];
        this.movie = JSON.parse(JSON.stringify(m)); //in questo modo clono il mio oggetto per la reset()
        this.movieDate = this.datePipe.transform(this.movie?.date, 'dd/MM/yyyy')!;
      }
    }
  }

  onSubmit() {
    this.onSaveComplete();
  }


  // saveMovie() {
  //   if (this.movieForm.valid) {
  //     if (this.movieForm.dirty) {
  //       const m = { ...this.movie, ...this.movieForm.value }; //override movie fields with values of form edited

  //       if (m.id === 0) {
  //         this.movieService.createMovie(m)
  //           .subscribe({
  //             next: x => {
  //               console.log(x);
  //               return this.onSaveComplete();
  //             },
  //             error: err => this.errorMessage = err
  //           });
  //       } else {
  //         this.movieService.updateMovie(m)
  //           .subscribe({
  //             next: () => this.onSaveComplete(),
  //             error: err => this.notifyService.showWarning('Error Updating Movie', err)
  //           });
  //       }

  //     }
  //   } else {      
  //     this.notifyService.showWarning('', 'Please correct the validation errors');
  //   }
  // }

  deleteMovie(): void {
    if (this.movie?.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else if (this.movie!.id) {
      if (confirm(`Really delete the movie: ${this.movie!.title}?`)) {
        setTimeout(() => alert('Movie deleted!'), 1000);
        setTimeout(() => this.router.navigate(['/movie-catalog']), 1000);
      }
    }
  }

  resetForm() {
    this.movieForm?.reset();  
    this.newMovie = true;  
  }

  setDefaultForm() {
    this.movie = {
      id: -1,
      title: '',
      genere: '',
      rating: 0,
      date: new Date()
    };
  }

  onSaveComplete(): void {
    setTimeout(() => {
      this.movieForm!.reset();
      alert('Movie saved!');
      this.router.navigate(['/movie-catalog']);
    }, 1000);


  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dummyMovies } from '../../models/dummy-movie';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie-catalog.component.html',
  styleUrls: ['./movie-catalog.component.css']
})
export class MovieCatalogComponent implements OnInit {

  listMovie: Movie[] | undefined;
  selectedMovie: Movie | undefined;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.listMovie = dummyMovies;
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

}

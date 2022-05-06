import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { dummyMovies } from '../../models/dummy-movie';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  pageTitle:string = 'Movie Detail';
  movie: Movie | undefined;
  movieList: Movie[] = dummyMovies;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    if(id !== undefined) {
      this.movie = dummyMovies.filter(m => m.id === id)[0];
    }
  }

}

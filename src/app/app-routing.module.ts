import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/components/login.component';
import { MovieCatalogComponent } from './movie/components/movie-catalog/movie-catalog.component';
import { MovieDetailComponent } from './movie/components/movie-detail/movie-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'movies', redirectTo: '/movie-catalog', pathMatch: 'full' },
  { path: 'movie-catalog', component: MovieCatalogComponent },
  { path: 'movie-detail/:id', component: MovieDetailComponent  },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

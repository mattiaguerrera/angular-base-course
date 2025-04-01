import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/components/login.component';
import { HomeComponent } from './home/home.component';
import { MovieCatalogComponent } from './movie/components/movie-catalog/movie-catalog.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MovieDetailComponent } from './movie/components/movie-detail/movie-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginModule } from './login/login.module';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieCatalogComponent,
    MovieDetailComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    SharedModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

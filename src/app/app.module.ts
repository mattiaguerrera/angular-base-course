import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/components/login.component';
import { HomeComponent } from './home/home.component';
import { MovieCatalogComponent } from './movie/components/movie-catalog/movie-catalog.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ConvertSpaceToUnderscorePipe } from './shared/pipes/title.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MovieCatalogComponent,
    ConvertSpaceToUnderscorePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

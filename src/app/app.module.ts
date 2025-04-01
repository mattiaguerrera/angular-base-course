import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MovieComponent } from './movie/components/movie.component';
import { LoginModule } from './login/login.module';
import { LoginComponent } from './login/components/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieComponent
    // LoginComponent // Non devo importarlo: sto utilizzando il module relativo (LoginModule)
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

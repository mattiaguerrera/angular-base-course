import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-base-course';


  constructor(public loginService: LoginService,
              private router: Router) {
  }

  logout() {
    this.loginService.logout();
  }
  
}

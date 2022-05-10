import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userName: string | undefined;
  isLogged: boolean = false;

  constructor(private router: Router) { }

  doLogon(userName: string) {
    this.userName = userName;
    this.isLogged = true;
  }

  logout() {
    this.isLogged = false;
    this.userName = undefined;
    this.router.navigate(['login']);
  }

  checkUser() {
    if (this.isLogged == false) {
      this.router.navigate(['login']);
    }
  }
  
}

import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private eventLogin: EventEmitter<boolean> = new EventEmitter();

  userName: string | undefined;
  isLogged: boolean = false;

  isLogged$: Observable<boolean> = new Observable(t => {
    this.eventLogin.subscribe(event => {
      console.log(event);
      t.next(event);
    });
  });
  
  constructor(private router: Router) { }

  doLogon(userName: string) {
    this.userName = userName;
    this.isLogged = true;
    this.eventLogin.emit(true);
  }

  logout() {
    this.isLogged = false;
    this.userName = undefined;
    this.eventLogin.emit(false);
    this.router.navigate(['login']);
  }

  checkUser() {
    if (this.isLogged == false) {
      this.router.navigate(['login']);
    }
  }
  
}

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'Login';
  userName: string | undefined;

  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
  }

  logon() {
    this.loginService.doLogon(this.userName!);
    this.router.navigate(['home']);
  }
}

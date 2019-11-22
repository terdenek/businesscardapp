import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private authService: AuthService, private router: Router
  ) { }

  ngOnInit() {
    if(this.authService.isAuthenticated) {
      // redirect if already authenticated
      this.router.navigate(['/dashboard']);
    }
  }

  tryLogin() {
    this.authService.login(this.email, this.password).then(
      res => {
        console.log(res);
        this.router.navigate(['/dashboard']);
      }
    ).catch((err) => { alert(err.message); })
  }
}

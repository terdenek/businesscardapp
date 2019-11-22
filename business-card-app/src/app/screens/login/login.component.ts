import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  returnUrl: string = '/';
  errorMessage: string;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if(this.authService.isAuthenticated) {
      // redirect if already authenticated
      this.router.navigateByUrl(this.returnUrl);
    } else {
      this.route.queryParams
      .subscribe(params => this.returnUrl = params['returnUrl'] || '/');
    }
  }

  tryLogin() {
    if(this.email && this.password) {
      this.authService.login(this.email, this.password).then(
        res => {
          this.router.navigateByUrl(this.returnUrl);
        }
      ).catch((err) => { 
        this.errorMessage = err.message;
      })
    } else {
      this.errorMessage = "Email & Password are required fields";
    }
  }
}

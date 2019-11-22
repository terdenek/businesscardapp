import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  isAuthenticated: boolean;  

  constructor(
    private authService: AuthService,
    private router: Router
  ) { 
    authService.authChangeListener.subscribe(x => this.updateAuth());
  }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  updateAuth() {
    this.isAuthenticated = this.authService.isAuthenticated();
  }
}

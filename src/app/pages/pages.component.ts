import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../shared/models/service-response/auth-response.model';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  user: User;
  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.getUserDetails();
  }

  onLogout() {
    this.authService.signOut();
    this.router.navigate(['/sign-in']);
  }

  ngOnInit(): void {}
}

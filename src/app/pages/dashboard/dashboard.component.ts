import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/service-response/auth-response.model';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: User;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.user = this.authService.getUserDetails();
    if (this.user.user_type === 'CLASSROOM_ADMIN') {
      this.router.navigate(['/classroom/list']);
    } else if (this.user.user_type === 'STUDENT') {
      this.userService.me().subscribe((res) => {
        this.router.navigate([
          '/classroom/code/' + res.metadata.classroom_code,
        ]);
      });
    }
  }

  ngOnInit(): void {}
}

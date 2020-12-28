import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChild,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../models/service-response/auth-response.model';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivateChild {
  user: User | null;
  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.getUserDetails();
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let roles = route.data.roles as Array<string>;

    if (this.user && roles.includes(this.user.user_type)) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, public router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      !(req.url.endsWith('/auth/signin') || req.url.endsWith('/auth/signup'))
    ) {
      if (req.method === 'POST' && !req.url.endsWith('/upload')) {
        const headers = new HttpHeaders({
          Authorization: 'Bearer ' + this.authService.getToken(),
          'Content-Type': 'application/json',
        });
        req = req.clone({ headers });
      } else {
        const headers = new HttpHeaders({
          Authorization: 'Bearer ' + this.authService.getToken(),
        });
        req = req.clone({ headers });
      }
    } else {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      req = req.clone({ headers });
    }
    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (
            event instanceof HttpResponse &&
            event.url &&
            (event.url.endsWith('/auth/signin') ||
              event.url.endsWith('/auth/signup'))
          ) {
            if (event.body.user.hasOwnProperty('username')) {
              this.authService.updateToken(event.body.token);
              this.authService.setUserDetails(event.body.user);
              this.router.navigate(['']);
            } else {
              this.authService.signOut();
              this.router.navigate(['/sign-in']);
            }
          }
        },
        (err: any) => {
          console.log(err);
          if (err instanceof HttpErrorResponse) {
            if (err.status === 404) {
              this.authService.signOut();
              this.router.navigate(['/sign-in']);
            }
          }
        }
      )
    );
  }
}

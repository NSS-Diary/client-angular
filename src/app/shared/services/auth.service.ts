import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  SignInRequest,
  SignUpRequest,
} from '../models/service-request/auth-request.model';
import {
  SignInResponse,
  User,
} from '../models/service-response/auth-response.model';
import { CommonResponse } from '../models/service-response/common-response.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiEndpoint = environment.apiEndpoint;

  constructor(public http: HttpClient, public router: Router) {}

  public signIn(form: SignInRequest) {
    return this.http.post<SignInResponse>(
      `${this.apiEndpoint}/api/auth/signin`,
      form
    );
  }

  public signUp(form: SignUpRequest) {
    return this.http.post<SignInResponse>(
      `${this.apiEndpoint}/api/auth/signup`,
      form
    );
  }

  public validateLogin(): boolean {
    const storageToken = this.getToken();
    const user = this.getUserDetails();
    if (
      storageToken &&
      storageToken !== '' &&
      user &&
      Object.keys(user).length !== 0
    ) {
      return true;
    }
    return false;
  }

  public setUserDetails(user: User) {
    this.removeUserDetails();
    localStorage.setItem('user', JSON.stringify(user));
    return 0;
  }
  public removeUserDetails() {
    if (localStorage.hasOwnProperty('user')) {
      localStorage.removeItem('user');
    }
  }
  public getUserDetails(): User | null {
    const user = localStorage.getItem('user');
    if (user !== null) {
      return JSON.parse(user);
    }
    return null;
  }

  public getToken(): string | null {
    const token = localStorage.getItem('token');
    if (token !== null) {
      return JSON.parse(token);
    } else {
      this.signOut();
      this.router.navigate(['/sign-in']);
    }
    return null;
  }

  public updateToken(token: string) {
    this.updateTokenOnLocalStorage(token);
  }

  public signOut() {
    this.removeTokenOnLocalStorage();
    this.removeUserDetails();
  }

  private updateTokenOnLocalStorage(token: string) {
    if (localStorage.hasOwnProperty('token')) {
      this.removeTokenOnLocalStorage();
    }
    localStorage.setItem('token', JSON.stringify(token));
  }

  private removeTokenOnLocalStorage() {
    localStorage.removeItem('token');
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  UserListRequest,
  UserAddRequest,
} from '../models/service-request/user-request';
import {
  UserListResponse,
  UserMeResponse,
} from '../models/service-response/user-response';
import { CommonResponse } from '../models/service-response/common-response.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiEndpoint = environment.apiEndpoint;

  constructor(public http: HttpClient, public router: Router) {}

  public userList(form: UserListRequest) {
    return this.http.post<UserListResponse[]>(
      `${this.apiEndpoint}/api/user/list`,
      form
    );
  }

  public me() {
    return this.http.get<UserMeResponse>(`${this.apiEndpoint}/api/user/me`);
  }

  public userAdd(form: UserAddRequest) {
    return this.http.post<CommonResponse>(
      `${this.apiEndpoint}/api/user/add`,
      form
    );
  }
}

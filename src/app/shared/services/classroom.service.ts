import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonResponse } from '../models/service-response/common-response.model';
import { ClassroomAddRequest } from '../models/service-request/classroom-request.model';
import { ClassroomListResponse } from '../models/service-response/classroom-response.model';

@Injectable({
  providedIn: 'root',
})
export class ClassroomService {
  private apiEndpoint = environment.apiEndpoint;

  constructor(public http: HttpClient, public router: Router) {}

  public classroomList() {
    return this.http.get<ClassroomListResponse[]>(
      `${this.apiEndpoint}/api/classroom/list`
    );
  }

  public classroomAdd(form: ClassroomAddRequest) {
    console.log(form);
    return this.http.post<CommonResponse>(
      `${this.apiEndpoint}/api/classroom/add`,
      form
    );
  }
}

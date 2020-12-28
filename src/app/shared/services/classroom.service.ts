import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonResponse } from '../models/service-response/common-response.model';
import {
  AddActivityRequest,
  AddNotificationRequest,
  ClassroomAddRequest,
  ClassroomInfoRequest,
  EnrollRequest,
  LockActivityRequest,
} from '../models/service-request/classroom-request.model';
import {
  ActivitiesListResponse,
  ClassroomListResponse,
  EnrolledActivityListResponse,
  NotificationListResponse,
} from '../models/service-response/classroom-response.model';

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
    return this.http.post<CommonResponse>(
      `${this.apiEndpoint}/api/classroom/add`,
      form
    );
  }

  public notificationAdd(form: AddNotificationRequest) {
    return this.http.post<CommonResponse>(
      `${this.apiEndpoint}/api/classroom/notification/add`,
      form
    );
  }

  public classroomInfo(form: ClassroomInfoRequest) {
    return this.http.post<ClassroomListResponse[]>(
      `${this.apiEndpoint}/api/classroom/info`,
      form
    );
  }

  public notificationList(form: ClassroomInfoRequest) {
    return this.http.post<NotificationListResponse[]>(
      `${this.apiEndpoint}/api/classroom/notification/list`,
      form
    );
  }

  public activityList(form: ClassroomInfoRequest) {
    return this.http.post<ActivitiesListResponse[]>(
      `${this.apiEndpoint}/api/classroom/activities/list`,
      form
    );
  }
  public activityAdd(form: AddActivityRequest) {
    return this.http.post<CommonResponse>(
      `${this.apiEndpoint}/api/classroom/activities/add`,
      form
    );
  }
  public lockActivity(form: LockActivityRequest) {
    return this.http.post<CommonResponse>(
      `${this.apiEndpoint}/api/classroom/activities/lock`,
      form
    );
  }
  public enrollStudent(form: EnrollRequest) {
    return this.http.post<CommonResponse>(
      `${this.apiEndpoint}/api/classroom/activities/enroll`,
      form
    );
  }
  public enrolledActivityList() {
    return this.http.get<EnrolledActivityListResponse[]>(
      `${this.apiEndpoint}/api/classroom/activities/enrolled-list`
    );
  }
}

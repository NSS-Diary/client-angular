import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/shared/models/service-response/auth-response.model';
import {
  ActivitiesListResponse,
  ClassroomListResponse,
  NotificationListResponse,
} from 'src/app/shared/models/service-response/classroom-response.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ClassroomService } from 'src/app/shared/services/classroom.service';

@Component({
  selector: 'app-classroom-view',
  templateUrl: './classroom-view.component.html',
  styleUrls: ['./classroom-view.component.scss'],
})
export class ClassroomViewComponent implements OnInit {
  user: User;
  classInfo: ClassroomListResponse;

  activities: ActivitiesListResponse[];
  activityAddForm: FormGroup = new FormGroup({
    classroom_code: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    start_time: new FormControl('', [Validators.required]),
    end_time: new FormControl('', [Validators.required]),
  });

  notifications: NotificationListResponse[];
  notificationAddForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    classroom_code: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private classroomService: ClassroomService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.getClassroomInfo();
    this.user = this.authService.getUserDetails();
  }

  onNotifAddFormSubmit() {
    if (this.notificationAddForm.valid) {
      this.spinner.show();
      this.classroomService
        .notificationAdd(this.notificationAddForm.value)
        .subscribe(
          (res) => {
            this.snackBar.open(res.message, 'Success', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
            this.spinner.hide();
            this.getNotifications();
          },
          (err) => {
            this.snackBar.open(err.error.errors.message, 'Error', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
            this.spinner.hide();
          }
        );
    }
  }

  onActivityAddFormSubmit() {
    console.log(this.activityAddForm.value);
    if (this.activityAddForm.valid) {
      this.spinner.show();
      this.classroomService.activityAdd(this.activityAddForm.value).subscribe(
        (res) => {
          this.snackBar.open(res.message, 'Success', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          this.spinner.hide();
          this.getNotifications();
        },
        (err) => {
          this.snackBar.open(err.error.errors.message, 'Error', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          this.spinner.hide();
        }
      );
    }
  }

  getNotifications() {
    this.classroomService
      .notificationList({ classroom_code: this.classInfo.classroom_code })
      .subscribe(
        (res) => {
          this.notifications = res;
          console.log(res);
        },
        (err) => {
          this.snackBar.open(err.error.errors.message, 'Error', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        }
      );
  }

  getActivities() {
    this.classroomService
      .activityList({ classroom_code: this.classInfo.classroom_code })
      .subscribe(
        (res) => {
          this.activities = res;
          console.log(res);
        },
        (err) => {
          this.snackBar.open(err.error.errors.message, 'Error', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        }
      );
  }

  getClassroomInfo() {
    const Id = this.router.url.split('/').pop();
    this.classroomService.classroomInfo({ classroom_code: Id }).subscribe(
      (res) => {
        this.classInfo = res[0];
        this.notificationAddForm.patchValue({
          classroom_code: this.classInfo.classroom_code,
        });
        this.activityAddForm.patchValue({
          classroom_code: this.classInfo.classroom_code,
        });
        this.getNotifications();
        this.getActivities();
      },
      (err) => {
        this.snackBar.open(err.error.errors.message, 'Error', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      }
    );
  }

  ngOnInit(): void {}
}

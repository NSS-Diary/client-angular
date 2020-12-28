import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/shared/models/service-response/auth-response.model';
import {
  ActivitiesListResponse,
  ClassroomListResponse,
  NotificationListResponse,
} from 'src/app/shared/models/service-response/classroom-response.model';
import { UserListResponse } from 'src/app/shared/models/service-response/user-response';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ClassroomService } from 'src/app/shared/services/classroom.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-classroom-view',
  templateUrl: './classroom-view.component.html',
  styleUrls: ['./classroom-view.component.scss'],
})
export class ClassroomViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  user: User;
  users: MatTableDataSource<UserListResponse> = new MatTableDataSource();
  displayedColumns: string[] = [
    'id',
    'name',
    'username',
    'email',
    'social',
    'farm',
  ];
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
    private userService: UserService,
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
          this.getActivities();
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

  getStudents() {
    this.userService
      .userList({
        role: 'STUDENT',
        classroom_code: this.classInfo.classroom_code,
      })
      .subscribe(
        (res) => {
          this.users = new MatTableDataSource(
            res.map((user, id) => {
              return { ...user, id: id + 1 };
            })
          );
          this.users.paginator = this.paginator;
          this.users.sort = this.sort;
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

  getNotifications() {
    this.classroomService
      .notificationList({ classroom_code: this.classInfo.classroom_code })
      .subscribe(
        (res) => {
          this.notifications = res;
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
        this.getStudents();
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();

    if (this.users.paginator) {
      this.users.paginator.firstPage();
    }
  }

  ngOnInit(): void {}
}

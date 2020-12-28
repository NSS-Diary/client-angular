import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserListResponse } from 'src/app/shared/models/service-response/user-response';
import { ClassroomService } from 'src/app/shared/services/classroom.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-classroom-add',
  templateUrl: './classroom-add.component.html',
  styleUrls: ['./classroom-add.component.scss'],
})
export class ClassroomAddComponent implements OnInit {
  admins: UserListResponse[];
  classroomAddForm: FormGroup = new FormGroup({
    classroomName: new FormControl('', [Validators.required]),
    adminName: new FormControl('', [Validators.required]),
  });

  constructor(
    private userService: UserService,
    private classroomService: ClassroomService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {
    this.ListUsers();
  }

  onClassroomAddFormSubmit() {
    console.log(this.classroomAddForm.value);
    if (this.classroomAddForm.valid) {
      this.spinner.show();
      this.classroomService.classroomAdd(this.classroomAddForm.value).subscribe(
        (res) => {
          this.snackBar.open(res.message, 'Success', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          console.log(res);
          this.ListUsers();
          this.spinner.hide();
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

  ListUsers() {
    this.userService.userList({ role: 'CLASSROOM_ADMIN' }).subscribe(
      (res) => {
        this.admins = res;
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

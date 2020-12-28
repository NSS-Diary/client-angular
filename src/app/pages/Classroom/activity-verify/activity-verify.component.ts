import { OnInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { VerificationListResponse } from 'src/app/shared/models/service-response/classroom-response.model';
import { ClassroomService } from 'src/app/shared/services/classroom.service';

@Component({
  selector: 'app-activity-verify',
  templateUrl: './activity-verify.component.html',
  styleUrls: ['./activity-verify.component.scss'],
})
export class ActivityVerifyComponent implements OnInit {
  dataSource: MatTableDataSource<VerificationListResponse> = new MatTableDataSource();

  constructor(
    private classroomService: ClassroomService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.ListVerification();
  }

  verify(id: string, status: string) {
    this.classroomService.verifyProof({ enrollment_id: id, status }).subscribe(
      (res) => {
        this.snackBar.open(status, 'Success', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.ListVerification();
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

  ListVerification() {
    const Id = this.router.url.split('/').pop();
    this.classroomService.verificationList({ activity_id: Id }).subscribe(
      (res) => {
        this.dataSource.data = res.map((user, id) => {
          return {
            ...user,
            id: id + 1,
            img_path: user.img_path.split('/').pop(),
          };
        });
        if (res.length === 0) {
          this.snackBar.open('Nothing to verify', 'Error', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        }
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
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {}
}

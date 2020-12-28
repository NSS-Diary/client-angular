import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClassroomListResponse } from 'src/app/shared/models/service-response/classroom-response.model';
import { ClassroomService } from 'src/app/shared/services/classroom.service';

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.scss'],
})
export class ClassroomListComponent implements OnInit {
  dataSource: MatTableDataSource<ClassroomListResponse> = new MatTableDataSource();

  constructor(
    private classroomService: ClassroomService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.ListClassrooms();
  }

  routeTo(id: string) {
    this.router.navigate(['/classroom/code/' + id]);
  }

  ListClassrooms() {
    this.classroomService.classroomList().subscribe(
      (res) => {
        this.dataSource.data = res;
        console.log(this.dataSource);
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

  ngOnInit(): void {}
}

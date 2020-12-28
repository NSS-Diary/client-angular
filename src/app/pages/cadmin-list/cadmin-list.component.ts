import { OnInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/shared/services/user.service';
interface UserListMod {
  name: string;
  email: string;
  username: string;
  id: number;
}

@Component({
  selector: 'app-cadmin-list',
  templateUrl: './cadmin-list.component.html',
  styleUrls: ['./cadmin-list.component.scss'],
})
export class CAdminListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'username', 'email'];
  dataSource: MatTableDataSource<UserListMod>;
  userAddForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    user_type: new FormControl('', [Validators.required]),
  });

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, private snackBar: MatSnackBar) {
    this.ListUsers();
  }

  onUserAddFormSubmit() {
    if (this.userAddForm.valid) {
      this.userService.userAdd(this.userAddForm.value).subscribe(
        (res) => {
          this.snackBar.open(res.message, 'Success', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          console.log(res);
          this.ListUsers();
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
  }

  ListUsers() {
    this.userService.userList({ role: 'CLASSROOM_ADMIN' }).subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource(
          res.map((user, id) => {
            return { ...user, id: id + 1 };
          })
        );
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {}
}

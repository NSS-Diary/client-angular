import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClassroomService } from 'src/app/shared/services/classroom.service';

@Component({
  selector: 'app-upload-proof',
  templateUrl: './upload-proof.component.html',
  styleUrls: ['./upload-proof.component.scss'],
})
export class UploadProofComponent implements OnInit {
  uploadProofForm: FormGroup = new FormGroup({
    file: new FormControl(null, [Validators.required]),
  });
  file: File;
  fileName = 'Choose File';

  constructor(
    public dialogRef: MatDialogRef<UploadProofComponent>,
    private snackBar: MatSnackBar,
    private classroomService: ClassroomService,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  uploadProof() {
    if (this.uploadProofForm.invalid) {
      this.snackBar.open('Please upload an image', 'Success', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
    } else if (this.file == null || !this.file) {
      this.snackBar.open('Please upload an image', 'Success', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
    } else {
      this.classroomService.uploadProof(this.data, this.file).subscribe(
        (res) => {
          this.snackBar.open('Proof Uploaded', 'Success', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          this.dialogRef.close();
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
  onFileUpload($event) {
    this.file = $event.target.files[0];
    this.fileName = $event.target.files[0].name;
  }

  ngOnInit(): void {}
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  exports: [
    MatExpansionModule,
    MatTabsModule,
    MatToolbarModule,
    MatStepperModule,
    MatSnackBarModule,
    MatRippleModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatButtonModule,
    MatGridListModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatDividerModule,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
})
export class SharedModule {}

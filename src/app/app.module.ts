import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from './shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppInterceptor } from './shared/utils/app-network-interceptor';

import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PagesComponent } from './pages/pages.component';
import { CAdminListComponent } from './pages/cadmin-list/cadmin-list.component';
import { ClassroomAddComponent } from './pages/Classroom/classroom-add/classroom-add.component';
import { ClassroomListComponent } from './pages/Classroom/classroom-list/classroom-list.component';
import { ClassroomViewComponent } from './pages/Classroom/classroom-view/classroom-view.component';
import { UploadProofComponent } from './pages/Classroom/classroom-view/upload-proof/upload-proof.component';
import { ActivityVerifyComponent } from './pages/Classroom/activity-verify/activity-verify.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    PagesComponent,
    CAdminListComponent,
    ClassroomAddComponent,
    ClassroomListComponent,
    ClassroomViewComponent,
    UploadProofComponent,
    ActivityVerifyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  entryComponents: [UploadProofComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AdminComponent } from './components/admin/admin.component';
import { StudentComponent } from './components/student/student.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminSidebarComponent } from './components/admin/admin-sidebar/admin-sidebar.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminAddCourseComponent } from './components/admin/admin-add-course/admin-add-course.component';
import { AdminViewCourseComponent } from './components/admin/admin-view-course/admin-view-course.component';
import { AdminViewStudentComponent } from './components/admin/admin-view-student/admin-view-student.component';
import { AdminAddStudentComponent } from './components/admin/admin-add-student/admin-add-student.component';
import { AdminAddAdminComponent } from './components/admin/admin-add-admin/admin-add-admin.component';
import { AdminViewAdminComponent } from './components/admin/admin-view-admin/admin-view-admin.component';
import { AdminRequestedMeetingComponent } from './components/admin/admin-requested-meeting/admin-requested-meeting.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { StudentSidebarComponent } from './components/student/student-sidebar/student-sidebar.component';
import { StudentDashboardComponent } from './components/student/student-dashboard/student-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    StudentComponent,
    ForbiddenComponent,
    HeaderComponent,
    FooterComponent,
    AdminSidebarComponent,
    AdminDashboardComponent,
    AdminAddCourseComponent,
    AdminViewCourseComponent,
    AdminViewStudentComponent,
    AdminAddStudentComponent,
    AdminAddAdminComponent,
    AdminViewAdminComponent,
    AdminRequestedMeetingComponent,
    ProfileComponent,
    ConfirmDialogComponent,
    LeaderboardComponent,
    StudentSidebarComponent,
    StudentDashboardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot({
      timeOut: 3000, 
      positionClass: 'toast-top-right', 
      preventDuplicates: true, 
      closeButton: true, 
    }),
    ModalModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

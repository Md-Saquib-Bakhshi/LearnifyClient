import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { StudentComponent } from './components/student/student.component';
import { AdminGuard } from './guards/admin.guard';
import { StudentGuard } from './guards/student.guard';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminAddCourseComponent } from './components/admin/admin-add-course/admin-add-course.component';
import { AdminViewCourseComponent } from './components/admin/admin-view-course/admin-view-course.component';
import { AdminAddStudentComponent } from './components/admin/admin-add-student/admin-add-student.component';
import { AdminViewStudentComponent } from './components/admin/admin-view-student/admin-view-student.component';
import { AdminAddAdminComponent } from './components/admin/admin-add-admin/admin-add-admin.component';
import { AdminViewAdminComponent } from './components/admin/admin-view-admin/admin-view-admin.component';
import { AdminRequestedMeetingComponent } from './components/admin/admin-requested-meeting/admin-requested-meeting.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { StudentDashboardComponent } from './components/student/student-dashboard/student-dashboard.component';

const routes: Routes = [
  {path:"", redirectTo:"/login", pathMatch:"full"},
  {path:"login", component:LoginComponent, canActivate: [AuthGuard]},
  {path:"forbidden", component:ForbiddenComponent},
  {path:"admin", component:AdminComponent, canActivate: [AdminGuard],
    children : [
      {path:"", redirectTo:"/admin/dashboard", pathMatch:"full"},
      {path:"dashboard", component:AdminDashboardComponent},
      {path:"add-course", component:AdminAddCourseComponent},
      {path:"view-course", component:AdminViewCourseComponent},
      {path:"add-student", component:AdminAddStudentComponent},
      {path:"view-student", component:AdminViewStudentComponent},
      {path:"add-admin", component:AdminAddAdminComponent},
      {path:"view-admin", component:AdminViewAdminComponent},
      {path:"requested-meeting", component:AdminRequestedMeetingComponent},
      {path:"profile", component:ProfileComponent},
      {path:"leaderboard", component:LeaderboardComponent}
    ]
  },
  {path:"student", component:StudentComponent, canActivate: [StudentGuard],
    children: [
      {path:"", redirectTo:"/student/dashboard", pathMatch:"full"},
      {path:"dashboard", component:StudentDashboardComponent},
      {path:"profile", component:ProfileComponent},
      {path:"leaderboard", component:LeaderboardComponent}
    ]
  },
  {path:"**", component:ForbiddenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

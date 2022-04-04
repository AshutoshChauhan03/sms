import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollegeComponent } from './admin/components/college/college.component';
import { StudentsComponent } from './admin/components/students/students.component';
import { TeachersComponent } from './admin/components/teachers/teachers.component';
import { PageNotFoundComponent } from './global-component/page-not-found/page-not-found.component';
import { AdminGuard } from './Guard/admin.guard';
import { AuthGuard } from './Guard/auth.guard';
import { ForgotPasswordComponent } from './log-in/components/forgot-password/forgot-password.component';
import { SignInComponent } from './log-in/components/sign-in/sign-in.component';
import { AcademicsComponent } from './student/components/academics/academics.component';
import { HomeComponent } from './student/components/home/home.component';
import { LeaveComponent } from './student/components/leave/leave.component';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full'},
  { path: 'signin', component: SignInComponent, },
  { path: 'college' , component: CollegeComponent, canActivate: [AdminGuard]},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'academics', component: AcademicsComponent, canActivate: [AuthGuard] },
  { path: 'leave', component: LeaveComponent, canActivate: [AuthGuard] },
  { path: 'students', component: StudentsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'teachers', component: TeachersComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

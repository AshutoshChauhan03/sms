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
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    component: SignInComponent
  },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    // loadChildren: () => import('./student/student.module').then((module: any) => module.StudentModule)
  },
  {
    path: 'academics',
    component: AcademicsComponent,
    canActivate: [AuthGuard],
    // loadChildren: () => import('./student/student.module').then((module: any) => module.StudentModule)
  },
  {
    path: 'leave',
    component: LeaveComponent,
    canActivate: [AuthGuard],
    // loadChildren: () => import('./student/student.module').then((module: any) => module.StudentModule)
  },
  {
    path: 'college',
    component: CollegeComponent,
    canActivate: [AuthGuard, AdminGuard],
    // loadChildren: () => import('./admin/admin.module').then((module: any) => module.AdminModule)
  },
  {
    path: 'students',
    component: StudentsComponent,
    canActivate: [AuthGuard, AdminGuard],
    // loadChildren: () => import('./admin/admin.module').then((module: any) => module.AdminModule)
  },
  {
    path: 'teachers',
    component: TeachersComponent,
    canActivate: [AuthGuard, AdminGuard],
    // loadChildren: () => import('./admin/admin.module').then((module: any) => module.AdminModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

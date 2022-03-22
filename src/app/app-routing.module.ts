import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './global-component/details/details.component';
import { PageNotFoundComponent } from './global-component/page-not-found/page-not-found.component';
import { AuthGuard } from './Guard/auth.guard';
import { ForgotPasswordComponent } from './log-in/components/forgot-password/forgot-password.component';
import { SignInComponent } from './log-in/components/sign-in/sign-in.component';
import { HomeComponent } from './student/components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full'},
  { path: 'signin', component: SignInComponent, },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'details', component: DetailsComponent, canActivate: [AuthGuard]},
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

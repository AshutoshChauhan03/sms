import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GlobalComponentModule } from '../global-component/global-component.module';
import { MatStepperModule } from '@angular/material/stepper';

const MaterialModules = [
  MatCardModule,
  MatStepperModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
]

@NgModule({
  declarations: [
    SignInComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    GlobalComponentModule,
    ReactiveFormsModule,
    MaterialModules
  ],
  exports: [
    MatFormFieldModule,
  ]
})
export class LogInModule { }

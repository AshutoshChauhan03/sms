import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { AcademicsComponent } from './components/academics/academics.component';
import { LeaveComponent } from './components/leave/leave.component';

@NgModule({
  declarations: [
    HomeComponent,
    AcademicsComponent,
    LeaveComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeComponent
  ]
})
export class StudentModule { }

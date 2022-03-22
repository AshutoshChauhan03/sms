import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students/students.component';
import { TeachersComponent } from './teachers/teachers.component';



@NgModule({
  declarations: [
    HomeComponent,
    StudentsComponent,
    TeachersComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TeacherModule { }

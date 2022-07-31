import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './components/students/students.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { CollegeComponent } from './components/college/college.component';



@NgModule({
  declarations: [
    StudentsComponent,
    TeachersComponent,
    CollegeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './components/students/students.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { HomeComponent } from './components/home/home.component';
import { CollegeComponent } from './components/college/college.component';



@NgModule({
  declarations: [
    StudentsComponent,
    TeachersComponent,
    HomeComponent,
    CollegeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }

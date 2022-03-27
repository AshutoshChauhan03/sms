import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './components/students/students.component';
import { TeachersComponent } from './components/teachers/teachers.component';



@NgModule({
  declarations: [
    StudentsComponent,
    TeachersComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }

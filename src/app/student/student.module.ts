import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademicsComponent } from './components/academics/academics.component';
import { LeaveComponent } from './components/leave/leave.component';
import { GlobalComponentModule } from '../global-component/global-component.module';

@NgModule({
  declarations: [
    AcademicsComponent,
    LeaveComponent,
  ],
  imports: [
    CommonModule,
    GlobalComponentModule
  ],
  exports: [
  ]
})
export class StudentModule { }

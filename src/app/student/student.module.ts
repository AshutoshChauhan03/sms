import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademicsComponent } from './components/academics/academics.component';
import { LeaveComponent } from './components/leave/leave.component';
import { GlobalComponentModule } from '../global-component/global-component.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatTableModule} from '@angular/material/table';
import { HomeComponent } from './components/home/home.component';
import {MatSelectModule} from '@angular/material/select';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { NgApexchartsModule } from "ng-apexcharts";
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/home/dialog.component';

const materialModule = [
  MatStepperModule,
  MatTableModule,
  MatSelectModule,
  MatDialogModule
]

@NgModule({
  declarations: [
    AcademicsComponent,
    LeaveComponent,
    HomeComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    GlobalComponentModule,
    materialModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatStepperModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkAccordionModule,
    NgxMatFileInputModule,
    NgApexchartsModule
  ],
  exports: [
  ]
})
export class StudentModule { }

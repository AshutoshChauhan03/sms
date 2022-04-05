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

import { 
	IgxDataChartCoreModule,
	IgxDataChartVerticalCategoryModule,
	IgxLegendModule,
	IgxDataChartInteractivityModule
 } from "igniteui-angular-charts";
 
const materialModule = [
  MatStepperModule,
  MatTableModule
]

@NgModule({
  declarations: [
    AcademicsComponent,
    LeaveComponent,
    HomeComponent,
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
    IgxDataChartCoreModule,
	  IgxDataChartVerticalCategoryModule,
	  IgxLegendModule,
	  IgxDataChartInteractivityModule
  ],
  exports: [
  ]
})
export class StudentModule { }

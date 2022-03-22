import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FlexLayoutModule } from "@angular/flex-layout";
import { LogInModule } from './log-in/log-in.module';

import { GlobalComponentModule } from './global-component/global-component.module';
import { StudentModule } from './student/student.module';
import { GlobalService } from './services/global.service';
import { CustomSnackBarService } from './services/custom-snack-bar.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';


const materialModules = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatSnackBarModule,
  FlexLayoutModule
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GlobalComponentModule,
    materialModules,

    FormsModule,
    LogInModule,

    StudentModule
  ],
  providers: [
    GlobalService,
    CustomSnackBarService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

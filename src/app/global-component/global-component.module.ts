import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from '../app-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import {MatSidenavModule} from '@angular/material/sidenav';

const materialModules = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  FlexLayoutModule,
  MatSidenavModule
]

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    SidebarComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    materialModules
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    SidebarComponent
  ]
})
export class GlobalComponentModule { }

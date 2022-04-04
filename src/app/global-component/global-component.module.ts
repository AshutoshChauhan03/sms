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
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';

const materialModules = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  FlexLayoutModule,
  MatSidenavModule,
  MatCardModule
]

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    SidebarComponent,
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

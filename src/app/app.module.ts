import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { NavbarComponent } from './shared/layout/navbar/navbar.component';
import { LoginComponent } from './core/components/login/login.component';
import { AddBranchComponent } from './modules/branch/add-branch/add-branch.component';
import { EditBranchComponent } from './modules/branch/edit-branch/edit-branch.component';
import { CourseSpecificReportComponent } from './modules/course-specific/course-specific-report/course-specific-report.component';
import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BranchService } from './services/branch/branch.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HeaderComponent,
    NavbarComponent,
    LoginComponent,
    AddBranchComponent,
    EditBranchComponent,
    CourseSpecificReportComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    Ng2SearchPipeModule
  ],
  providers: [BranchService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';
import { CourseSpecificReportComponent } from './modules/course-specific/course-specific-report/course-specific-report.component';
import { AddBranchComponent } from './modules/branch/add-branch/add-branch.component';
import { EditBranchComponent } from './modules/branch/edit-branch/edit-branch.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'configure_access', pathMatch: 'full' },
      { path: 'configure_access', component: CourseSpecificReportComponent },
      { path: 'add_branch', component: AddBranchComponent },
      { path: 'edit_branch', component: EditBranchComponent }
    ]
  },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

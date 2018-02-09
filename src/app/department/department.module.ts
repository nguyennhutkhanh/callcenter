import { PgService } from 'app/shared/services/pg.service';
import { LoginService } from './../shared/services/login.service';
import { AuthGuard } from './../shared/guards/auth.guard';
import { ContactService } from './../shared/services/contact.service';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RequestOptions } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DepartmentRoutingModule } from 'app/department/department-routing.module';
import { DepartmentComponent } from 'app/department/department.component';
import { DepartmentService } from 'app/shared/services/department.service';
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';
@NgModule({
  imports: [
    DepartmentRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, GridModule, HttpClientModule, ButtonModule, DialogModule
  ],
  declarations: [ 
    DepartmentComponent, CreateDepartmentComponent, EditDepartmentComponent, DepartmentDetailComponent, 
  ],
  providers:[ DepartmentService, HttpClient, AuthGuard, LoginService, PgService ]
})
export class DepartmentModule { }
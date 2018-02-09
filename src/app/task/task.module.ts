import { PgService } from './../shared/services/pg.service';
import { LoginService } from './../shared/services/login.service';
import { AuthGuard } from './../shared/guards/auth.guard';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskDetailComponent } from './../task/task-detail/task-detail.component';
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
import { TaskRoutingModule } from 'app/task/task-routing.module';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { TaskComponent } from './task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
@NgModule({
  imports: [
    TaskRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, GridModule, HttpClientModule, ButtonModule, DialogModule, DropDownsModule, InputsModule
  ],
  declarations: [ 
    TaskComponent, TaskDetailComponent, CreateTaskComponent, EditTaskComponent
  ],
  providers:[ DepartmentService, HttpClient, AuthGuard, LoginService, PgService ]
})
export class TaskModule { }
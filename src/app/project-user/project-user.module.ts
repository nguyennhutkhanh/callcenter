import { LoginService } from './../shared/services/login.service';
import { AuthGuard } from './../shared/guards/auth.guard';
import { ProjectUserDetailComponent } from './../project-user/project-user-detail/project-user-detail.component';
import { ProjectUserRoutingModule } from './project-user-routing.module';
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
import { ProjectUserComponent } from 'app/project-user/project-user.component';
import { ProjectUserService } from 'app/shared/services/project-user.service';
import { CreateProjectUserComponent } from './create-project-user/create-project-user.component';
import { EditProjectUserComponent } from './edit-project-user/edit-project-user.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { PgService } from 'app/shared/services/pg.service';

@NgModule({
  imports: [
    ProjectUserRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, GridModule, HttpClientModule, ButtonModule, DialogModule, DropDownsModule, InputsModule
  ],
  declarations: [ 
    ProjectUserComponent, 
    ProjectUserDetailComponent, CreateProjectUserComponent, EditProjectUserComponent
  ],
  providers:[ProjectUserService, HttpClient, AuthGuard, LoginService, PgService ]
})
export class ProjectUserModule { }
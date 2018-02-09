import { LoginService } from './../shared/services/login.service';
import { AuthGuard } from './../shared/guards/auth.guard';
import { ProjectDetailComponent } from './../project/project-detail/project-detail.component';
import { ProjectRoutingModule } from './project-routing.module';
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
import { ProjectComponent } from 'app/project/project.component';
import { ProjectService } from 'app/shared/services/project.service';
import { CreateProjectComponent } from './create-project/create-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { PgService } from 'app/shared/services/pg.service';

@NgModule({
  imports: [
    ProjectRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, GridModule, HttpClientModule, ButtonModule, DialogModule, DropDownsModule, InputsModule
  ],
  declarations: [ 
    ProjectComponent, 
    ProjectDetailComponent, CreateProjectComponent, EditProjectComponent
  ],
  providers:[ProjectService, HttpClient, AuthGuard, LoginService, PgService ]
})
export class ProjectModule { }
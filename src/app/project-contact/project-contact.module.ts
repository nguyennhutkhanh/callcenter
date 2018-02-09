import { LoginService } from './../shared/services/login.service';
import { AuthGuard } from './../shared/guards/auth.guard';
import { ProjectContactDetailComponent } from './../project-contact/project-contact-detail/project-contact-detail.component';
import { ProjectContactRoutingModule } from './project-contact-routing.module';
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
import { ProjectContactComponent } from 'app/project-contact/project-contact.component';
import { ProjectContactService } from 'app/shared/services/project-contact.service';
import { CreateProjectContactComponent } from './create-project-contact/create-project-contact.component';
import { EditProjectContactComponent } from './edit-project-contact/edit-project-contact.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { PgService } from 'app/shared/services/pg.service';

@NgModule({
  imports: [
    ProjectContactRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, GridModule, HttpClientModule, ButtonModule, DialogModule, DropDownsModule, InputsModule
  ],
  declarations: [ 
    ProjectContactComponent, 
    ProjectContactDetailComponent, CreateProjectContactComponent, EditProjectContactComponent
  ],
  providers:[ProjectContactService, HttpClient, AuthGuard, LoginService, PgService ]
})
export class ProjectContactModule { }
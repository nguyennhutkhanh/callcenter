import { PgService } from './../shared/services/pg.service';
import { LoginService } from './../shared/services/login.service';
import { AuthGuard } from './../shared/guards/auth.guard';
import { EmailDetailComponent } from './../email/email-detail/email-detail.component';
import { EmailRoutingModule } from './email-routing.module';
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
import { EmailComponent } from 'app/email/email.component';
import { EmailService } from 'app/shared/services/email.service';
import { CreateEmailComponent } from './create-email/create-email.component';
import { EditEmailComponent } from './edit-email/edit-email.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';

@NgModule({
  imports: [
    EmailRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, GridModule, HttpClientModule, ButtonModule, DialogModule, DropDownsModule, InputsModule
  ],
  declarations: [ 
    EmailComponent, 
    EmailDetailComponent, CreateEmailComponent, EditEmailComponent
  ],
  providers:[EmailService, HttpClient, AuthGuard, LoginService, PgService ]
})
export class EmailModule { }
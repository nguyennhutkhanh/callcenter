import { AuthGuard } from './../shared/guards/auth.guard';
import { LoginService } from './../shared/services/login.service';
import { PgService } from 'app/shared/services/pg.service';
import { AccountContactDetailComponent } from './../account-contact/account-contact-detail/account-contact-detail.component';
import { AccountContactRoutingModule } from './account-contact-routing.module';
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
import { AccountContactComponent } from 'app/account-contact/account-contact.component';
import { AccountContactService } from 'app/shared/services/account-contact.service';
import { CreateAccountContactComponent } from './create-account-contact/create-account-contact.component';
import { EditAccountContactComponent } from './edit-account-contact/edit-account-contact.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';

@NgModule({
  imports: [
    AccountContactRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, GridModule, HttpClientModule, ButtonModule, DialogModule, DropDownsModule, InputsModule
  ],
  declarations: [ 
    AccountContactComponent, 
    AccountContactDetailComponent, CreateAccountContactComponent, EditAccountContactComponent
  ],
  providers:[AccountContactService, HttpClient, AuthGuard, LoginService, PgService ]
})
export class AccountContactModule { }
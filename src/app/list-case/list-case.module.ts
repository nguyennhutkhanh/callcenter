import { PgService } from './../shared/services/pg.service';
import { LoginService } from './../shared/services/login.service';
import { AuthGuard } from './../shared/guards/auth.guard';
import { ListCaseService } from './../shared/services/list-case.service';
import { ListCaseRoutingModule } from './list-case-routing.module';

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
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns/dist/es/dropdowns.module';
import { ListCaseComponent } from 'app/list-case/list-case.component';
@NgModule({
  imports: [
    ListCaseRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, GridModule, HttpClientModule, ButtonModule, DialogModule, DropDownsModule, InputsModule
  ],
  declarations: [ 
    ListCaseComponent
  ],
  providers:[ ListCaseService, HttpClient, AuthGuard, LoginService, PgService ]
})
export class ListCaseModule { }
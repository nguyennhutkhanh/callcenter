import { TabsModule } from 'ngx-bootstrap/tabs';
import { PgService } from 'app/shared/services/pg.service';
import { LoginService } from './../shared/services/login.service';
import { AuthGuard } from './../shared/guards/auth.guard';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerService } from './../shared/services/customer.service';
import { CustomerComponent } from './customer.component';
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
@NgModule({
  imports: [
    CustomerRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, GridModule, HttpClientModule, ButtonModule, DialogModule, TabsModule
  ],
  declarations: [ 
    CustomerComponent, 
  ],
  providers:[ CustomerService, HttpClient, AuthGuard, LoginService, PgService ]
})
export class CustomerModule { }
import { LoginService } from './../shared/services/login.service';
import { AuthGuard } from './../shared/guards/auth.guard';
import { CreateRoleComponent } from './create-role/create-role.component';
import { RoleRoutingModule } from './role-routing.module';
import { CustomerService } from './../shared/services/customer.service';
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
import { RoleComponent } from 'app/role/role.component';
import { AssignRoleComponent } from './assign-role/assign-role.component';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { PgService } from 'app/shared/services/pg.service';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns/dist/es/dropdownlist.module';
@NgModule({
  imports: [
    RoleRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, GridModule, HttpClientModule, ButtonModule, DialogModule, DropDownListModule
  ],
  declarations: [ 
    RoleComponent, 
    CreateRoleComponent, AssignRoleComponent, EditRoleComponent
  ],
  providers:[ CustomerService, HttpClient, AuthGuard, LoginService, PgService ]
})
export class RoleModule { }
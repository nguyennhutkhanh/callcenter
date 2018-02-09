import { LoginService } from './../shared/services/login.service';
import { AuthGuard } from './../shared/guards/auth.guard';
import { RoleUserDetailComponent } from './../role-user/role-user-detail/role-user-detail.component';
import { RoleUserRoutingModule } from './role-user-routing.module';
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
import { RoleUserComponent } from 'app/role-user/role-user.component';
import { RoleUserService } from 'app/shared/services/role-user.service';
import { CreateRoleUserComponent } from './create-role-user/create-role-user.component';
import { EditRoleUserComponent } from './edit-role-user/edit-role-user.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { PgService } from 'app/shared/services/pg.service';

@NgModule({
  imports: [
    RoleUserRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, GridModule, HttpClientModule, ButtonModule, DialogModule, DropDownsModule, InputsModule
  ],
  declarations: [ 
    RoleUserComponent, 
    RoleUserDetailComponent, CreateRoleUserComponent, EditRoleUserComponent
  ],
  providers:[RoleUserService, HttpClient, AuthGuard, LoginService, PgService ]
})
export class RoleUserModule { }
import { LoginService } from './../shared/services/login.service';
import { AuthGuard } from './../shared/guards/auth.guard';
import { PopupModule } from '@progress/kendo-angular-popup/dist/es/popup.module';
import { UserService } from './../shared/services/user.service';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
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
import { UserDetailComponent } from './user-detail/user-detail.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { CommonService } from 'app/shared/services/common.service';
import { PgService } from 'app/shared/services/pg.service';
import { TabsModule } from 'ngx-bootstrap/tabs/tabs.module';
import { AdvancedSearchUserComponent } from './advanced-search-user/advanced-search-user.component';

@NgModule({
  imports: [
    UserRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, GridModule, HttpClientModule, ButtonModule, DialogModule, DropDownsModule, InputsModule, TabsModule
  ],
  declarations: [ 
    UserComponent, UserDetailComponent, CreateUserComponent, EditUserComponent, AdvancedSearchUserComponent
  ],
  providers:[ UserService, HttpClient, CommonService, AuthGuard, LoginService, PgService ]
})
export class UserModule { }
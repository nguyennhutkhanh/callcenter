import { ContactService } from './../../shared/services/contact.service';
import { UserService } from 'app/shared/services/user.service';
import { RoleJSon } from './../../shared/models/role';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RoleService } from './../../shared/services/role.service';
import { CommonService } from 'app/shared/services/common.service';
import { PgService } from 'app/shared/services/pg.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'app/shared/services/account.service';
import { DepartmentService } from 'app/shared/services/department.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss'],
  providers: [PgService, CommonService, RoleService, UserService, AccountService, ContactService, DepartmentService]
})
export class CreateRoleComponent implements OnInit {
  form: FormGroup;
  name: FormControl;
  description: FormControl;

  role: RoleJSon;

   //Error
   errorDialog: boolean = false;
   contentError: string = "";
   constructor(private fb: FormBuilder, private router: Router, private common: CommonService, private roleService: RoleService) { 
    this.role = new RoleJSon();
  }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.name = new FormControl('', Validators.required);
    this.description = new FormControl('', Validators.required);

    this.form = this.fb.group({
      name: this.name,
      description: this.description,
    });
  }

  onSave(){
    this.role.name = this.isNull(this.name.value);
    this.role.description = this.isNull(this.description.value);

    this.role.createdBy = "12345"; //Replace this one
    this.role.dateEntered = new Date();
    this.role.deleted = false;

    this.roleService.addRole(this.role)
    .then(result => {
      if(result.status == 200){
        this.onBack();
      }
    })
    .catch(error => {
      if(error.status == undefined){
        this.onBack();
      }else{
        this.errorDialog = true;
        this.contentError = error.status + " - " + error.statusText
      }
    });
  }

  onCloseErrorDialog(){
    this.errorDialog = false;
  }

  onBack(){
    this.router.navigateByUrl("role");
  }

  isNull(value){
    if(value == null)
      return '';
    return value;
  }
}

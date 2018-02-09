import { ContactService } from './../../shared/services/contact.service';
import { UserService } from 'app/shared/services/user.service';
import { RoleJSon } from './../../shared/models/role';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RoleService } from './../../shared/services/role.service';
import { CommonService } from 'app/shared/services/common.service';
import { PgService } from 'app/shared/services/pg.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'app/shared/services/account.service';
import { DepartmentService } from 'app/shared/services/department.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss'],
  providers: [PgService, CommonService, RoleService, UserService, AccountService, ContactService, DepartmentService]
})
export class EditRoleComponent implements OnInit {
  form: FormGroup;
  name: FormControl;
  description: FormControl;

  role: RoleJSon;
  id: string;
   //Error
   errorDialog: boolean = false;
   contentError: string = "";
   constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private common: CommonService, private roleService: RoleService) { 
    this.role = new RoleJSon();
  }

  ngOnInit() {
    this.createForm();
    this.activatedRoute.params.subscribe(params => {
      this.id =  params['id'] || '';

      this.onGetRole(this.id);
   });
  }

  private async onGetRole(id: string){
    this.roleService.getRole(id)
    .then(result => {
      this.role = result;

      this.createForm();
    })
    .catch(error => {
      console.log(error);
    });
  }

  private createForm() {
    this.name = new FormControl(this.role.name, Validators.required);
    this.description = new FormControl(this.role.description, Validators.required);

    this.form = this.fb.group({
      name: this.name,
      description: this.description,
    });
  }

  onSave(){
    this.role.name = this.isNull(this.name.value);
    this.role.description = this.isNull(this.description.value);

    this.role.modifiedUserId = "12345"; //Replace this one
    this.role.dateModified = new Date();

    this.roleService.updateRole(this.role)
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

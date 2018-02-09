import { DepartmentService } from './../shared/services/department.service';
import { Department } from 'app/shared/models/department';
import { ContactService } from './../shared/services/contact.service';
import { UserService } from 'app/shared/services/user.service';
import { Router } from '@angular/router';
import { RoleService } from './../shared/services/role.service';
import { Component, OnInit } from '@angular/core';
import { Role } from 'app/shared/models/role';
import { AccountService } from 'app/shared/services/account.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
  providers: [RoleService, UserService, AccountService, ContactService, DepartmentService], 
})
export class RoleComponent implements OnInit {
  roles: Role[] = [];
  id: string;
  openedDelete: boolean = false;

   //Error
   errorDialog: boolean = false;
   contentError: string = "";
  constructor(public router: Router, private roleService: RoleService) { }

  ngOnInit() {
    this.onGetRoles();
  }

  private async onGetRoles(){
    this.roleService.getRoles()
    .then(result => {
      this.roles = result;
    })
    .catch(error => {
      console.log(error);
    });
  }

  onCreateRole(){
    this.router.navigateByUrl("role/create-role");
  }

  onEditRole(id: string){
    this.router.navigate(["role/edit-role", id]);
  }

  onShowDialogDeleteRole(id:string){
    this.id = id;
    this.openedDelete = true;
  }

  onCloseDialogDeleteRole(){
    this.openedDelete = false;
  }

  onDeleteRole(id: string){
    this.onCloseDialogDeleteRole();
    this.roleService.deleteRole(id)
    .then(result => {
      if(result.status == 200){
        this.roles = this.roles.filter(item => item.id !== this.id);
      }
    })
    .catch(error => {
      if(error.status == undefined){
        this.roles = this.roles.filter(item => item.id !== this.id);
      }else{
        this.errorDialog = true;
        this.contentError = error.status + " - " + error.statusText
      }
    });
  }

  onCloseErrorDialog(){
    this.errorDialog = false;
  }

  onDetailRole(id: string){
    this.router.navigate(["role/assign-role", id]);
  }
}

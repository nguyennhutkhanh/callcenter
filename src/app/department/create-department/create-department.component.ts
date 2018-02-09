import { AccountService } from './../../shared/services/account.service';
import { ContactService } from 'app/shared/services/contact.service';
import { User } from './../../shared/models/user';
import { UserService } from './../../shared/services/user.service';
import { DepartmentService } from './../../shared/services/department.service';
import { CommonService } from 'app/shared/services/common.service';
import { Department } from './../../shared/models/department';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.scss'],
  providers: [CommonService, DepartmentService, UserService, ContactService, AccountService]
})
export class CreateDepartmentComponent implements OnInit {
  form: FormGroup;
  name: FormControl;
  description: FormControl;
  leader: FormControl;

  dept: Department;
  usersOfDept: User;
   //Error
   errorDialog: boolean = false;
   contentError: string = "";

    //User
    users: User[] = [];
    usersDialog: boolean = false;

    //User member
    userMembers: User[] = [];
    userMembersDialog: boolean = false;
    
  constructor(private fb: FormBuilder, private router: Router, private commonService: CommonService, private deptService: DepartmentService, private userService: UserService) { 
    this.dept =new Department();
  }

  ngOnInit() {
    this.createForm();
  }

  getUserOfDept(deptId: string){
    this.deptService.getUsersOfDept(deptId)
    .then(result =>{
      this.usersOfDept = result;
    })
    .catch(error => {
      console.log(error);
    }) 
  }

  private createForm() {
    this.name = new FormControl('', Validators.required);
    this.description = new FormControl('', Validators.required);
    this.leader = new FormControl('');

    this.form = this.fb.group({
      name: this.name,
      description: this.description,
      leader: this.leader,
    });
  }

  onSave(){
    this.dept.name = this.isNull(this.name.value);
    this.dept.description = this.isNull(this.description.value);
    this.dept.teamLeader = this.userIdDialog;

    this.deptService.addDept(this.dept)
    .then(result => {
      this.dept.id = result.id;
        this.getUserOfDept(result.id);
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
    this.router.navigateByUrl("department");
  }

  isNull(value){
    if(value == null)
      return '';
    return value;
  }

  onSelectUser(){
    this.usersDialog = true;
    this.onGetUsers();
  }

  onCloseUserDialog(){
    this.usersDialog = false;
  }

  userIdDialog: string = '';
  userNameModel: string = '';
  onUserSelect(item){
    this.userIdDialog = item.id;
    this.userNameModel = item.firstName + ' ' + item.lastName;
    this.usersDialog = false;
  }

  //Contact dialog
  private async onGetUsers(){
    this.userService.getUsers()
    .then(result => {
      this.users = result;
      this.userMembers = result;
    })
    .catch(error => {
      if(error.status == undefined){
       
      }else{
       
      }
    });
  }

  //User member
  onSelectUserMember(){
    this.userMembersDialog = true;
    this.onGetUsers();
  }

  onCloseUserMembersDialog(){
    this.userMembersDialog = false;
  }

  onUserMembersSelect(item){
    this.userMembersDialog = false;

    this.addUsersForDept(item.id);
  }

  addUsersForDept(userId: string){
    this.deptService.addUserForDept(this.dept.id,userId)
    .then(result =>{
      this.getUserOfDept(this.dept.id);
    })
    .catch(error => {

    })
  }
}

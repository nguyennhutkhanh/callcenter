import { AccountService } from 'app/shared/services/account.service';
import { ContactService } from 'app/shared/services/contact.service';
import { User } from './../../shared/models/user';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'app/shared/services/common.service';
import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'app/shared/services/department.service';
import { Department } from 'app/shared/models/department';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss'],
  providers: [CommonService, DepartmentService, UserService, ContactService, AccountService]
})
export class EditDepartmentComponent implements OnInit {

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
    
    id: string;
  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private commonService: CommonService, private deptService: DepartmentService, private userService: UserService) { 
    this.dept =new Department();
  }

  ngOnInit() {
    this.createForm();

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'] || '';

      this.getDept(this.id);

      this.getUserOfDept(this.id);
   });

  }

  getDept(id: string){
    this.deptService.getDept(id)
    .then(result => {
      this.dept = result;
      this.userIdDialog = this.dept.teamLeader;
      this.createForm();
    })
    .catch(error => {
      console.log(error);
    });
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
    this.name = new FormControl(this.dept.name, Validators.required);
    this.description = new FormControl(this.dept.description, Validators.required);
    this.leader = new FormControl(this.dept.learderName);

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

    this.deptService.updateDept(this.dept)
    .then(result => {
        this.getUserOfDept(this.id);
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
    this.addUsersForDept(item.id);
  }

  addUsersForDept(userId: string){
    console.log("User id" + userId);
    console.log("Dept id" + this.id);

    this.deptService.addUserForDept(this.id,userId)
    .then(result =>{
      this.getUserOfDept(this.id);

      this.onCloseUserMembersDialog();
    })
    .catch(error => {

    });
  }

  onDeleteUser(userId){
    this.deptService.deleteUserOfDept(this.id,userId)
    .then(result =>{
      this.getUserOfDept(this.id);
    })
    .catch(error => {
    });
  }

}

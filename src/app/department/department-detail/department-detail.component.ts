import { FormBuilder } from '@angular/forms';
import { User } from './../../shared/models/user';
import { Department } from 'app/shared/models/department';
import { CommonService } from 'app/shared/services/common.service';
import { UserService } from './../../shared/services/user.service';
import { ContactService } from 'app/shared/services/contact.service';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/shared/services/account.service';
import { DepartmentService } from 'app/shared/services/department.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.scss'],
  providers: [CommonService, DepartmentService, UserService, ContactService, AccountService]
})
export class DepartmentDetailComponent implements OnInit {
  dept: Department;
  usersOfDept: User;

  //User
  users: User[] = [];

  id: string;
  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private commonService: CommonService, private deptService: DepartmentService, private userService: UserService) { 
    this.dept =new Department();
  }

  ngOnInit() {

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
    })
    .catch(error => {
      console.log(error);
    });
  }

  getUserOfDept(deptId: string){
    this.deptService.getUsersOfDept(deptId)
    .then(result =>{
      this.usersOfDept = result;
      console.log(this.usersOfDept);
    })
    .catch(error => {
      console.log(error);
    }) 
  }

  onBack(){
    this.router.navigateByUrl("department");
  }

  isNull(value){
    if(value == null)
      return '';
    return value;
  }

  onEdit(id: string){
    this.router.navigate(["department/edit-department", id]);
  }
}

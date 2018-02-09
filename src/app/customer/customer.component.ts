import { CallJSon } from './../shared/models/call';
import { DepartmentService } from './../shared/services/department.service';
import { Account } from './../shared/models/account';
import { CommonService } from './../shared/services/common.service';
import { CallService } from './../shared/services/call.service';
import { User } from 'app/shared/models/user';
import { UserService } from 'app/shared/services/user.service';
import { Case } from 'app/shared/models/case';
import { CaseService } from './../shared/services/case.service';
import { Contact } from './../shared/models/contact';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from 'app/shared/services/contact.service';
import { AccountService } from 'app/shared/services/account.service';
import { CaseStatus } from 'app/shared/models/case-status';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  providers: [CommonService, ContactService, CaseService, UserService, CallService, AccountService,DepartmentService]
})
export class CustomerComponent implements OnInit {
  contact: Contact = new Contact();
  phone: string =  '';

  cases: Case[] = [];
  users: User[]=[];
  calls: CallJSon[] = [];
  constructor(private activatedRoute:ActivatedRoute, public router: Router, private commonService: CommonService, private contactService: ContactService, private caseService: CaseService, private callService: CallService, private userService: UserService) { 
    this.onGetUsers();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.phone =  params['phone'];
    });

    this.searchCustomer(this.phone);
    this.onGet5CaseByPhone(this.phone);
    this.onGet5CallsByPhone(this.phone);
  }

  searchCustomer(phone: string){
    this.onGetContactByPhone(phone);      
  }

  onCreateCall(){
    this.router.navigate(["call/create-call", this.phone]);
  }

  onCreateCase(){
    this.router.navigate(["case/create-case", this.phone]);
  }

  private async onGetContactByPhone(phone: string){
    this.contactService.searchContactByPhone(phone)
    .then(result => {
      this.contact = result;
    })
    .catch(error => {
      console.log(error);
    });
  }

  private onGet5CaseByPhone(phone: string){
    this.caseService.get5CasesByPhone(phone)
    .then(result => {
      this.cases = result;
      console.log(this.cases);
    })
    .catch(error => {
      console.log(error);
    })
  }

  ConvertIntToDateTime(value: number) {
    var month = new Date(value).getMonth() + 1;
    var day = new Date(value).getDate();
    return new Date(value).getFullYear() + "-" + (month <= 9 ? "0" + month : month) + "-" + (day <= 9 ? "0" + day : day);
  }

  private async onGetUsers(){
    this.userService.getUsers()
    .then(result => {
      this.users = result;
    })
    .catch(error => {
      if(error.status == undefined){
       
      }else{
       
      }
    });
  }

  onGetUserByUserID(id: string){
    if(id != null && id != ''){
      var u = this.users.find(item => item.id == id);
      if(u != undefined || u !=  null)
        return u.firstName + ' ' + u.lastName;
    }
      
    return '';
  }

  private async onGet5CallsByPhone(phone: string){
    this.callService.get5CallsByPhone(phone)
    .then(result => {
      this.calls = result;
      // this.totalrecord = this.callList.length;
      // this.init();
    })
    .catch(error => {
      console.log(error);
    });
  }

  onGetAccountNameByID(id: string){
    var ac: Account = this.commonService.getAccount(id);
    return ac.name;
  }

  // onGetUserByUserID(id: string){

  // }

  onGetStatusByID(id: string){
    var st: CaseStatus = this.commonService.getStatus(id);
    return st.name;
  }

  getUser(){
    return '';
  }

  ViewCase(id: string){
    this.router.navigate(["case/detail-case", id]);
  }
}

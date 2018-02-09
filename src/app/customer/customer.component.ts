import { CaseLogService } from './../shared/services/case-log.service';
import { CaseLog } from 'app/shared/models/case-log';
import { Call } from './../shared/models/call';
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
  providers: [CommonService, ContactService, CaseService, UserService, CallService, AccountService,DepartmentService, CaseLogService]
})
export class CustomerComponent implements OnInit {
  contact: Contact = new Contact();
  phone: string =  '';

  cases: Case[] = [];
  users: User[]=[];
  calls: Call[] = [];


  case: Case;
  caseLog: CaseLog[] = [];
  public listStatus: Array<{text: string, id: string, value: number }> = [
    { text: "Waiting", id: "40C3A4A9-F60C-4FFD-8CF8-100C6BED0647", value: 1 },
    { text: "Proccessing", id: "00E57127-9CC3-41F4-BEB3-064C02E14989", value: 2 },
    { text: "Confirm Wating", id: "4FD839BD-188E-4329-B405-05002B95462D", value: 3 },
    { text: "Rejected", id: "0FF820F8-7CB7-4B38-A536-55ED04EEFB5B", value: 4 },
    { text: "Closed", id: "47AB1A0B-7D46-491C-9D75-63BD31F8C907", value: 5 }
  ];
  constructor(private activatedRoute:ActivatedRoute, public router: Router, private commonService: CommonService, private contactService: ContactService, private caseService: CaseService, private callService: CallService, private userService: UserService, private caseLogService: CaseLogService) { 
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
      this.router.navigate(["account/create-account", this.phone]);
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

  detailDialog: boolean = false;
  showDetailCase(id: string){
    this.detailDialog = true;

    this.onGetCase(id);
    this.onGetCaseLogByCase(id);
  }

  onCloseDialog(){
    this.detailDialog = false;
  }


  private async onGetCase(id: string){
    this.caseService.getCase(id)
    .then(result => {
      this.case = result;
      //this.statusId = this.status(result.statusId);
    })
    .catch(error => {
    });
  }

  private async onGetCaseLogByCase(id: string){
    this.caseLogService.getCaseLogsByCase(id)
    .then(result => {
      this.caseLog = result;
    })
    .catch(error => {
    });
  }

  public statusName(statusid : string){
    return this.listStatus.find(r => r.id == statusid).text;
  }
}

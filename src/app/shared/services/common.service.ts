import { Department } from './../models/department';
import { CaseStatus } from './../models/case-status';
import { User } from 'app/shared/models/user';
import { ContactService } from 'app/shared/services/contact.service';
import { AccountService } from 'app/shared/services/account.service';
import { UserService } from 'app/shared/services/user.service';
import { Contact } from './../models/contact';
import { Account } from './../models/account';
import { Observable } from 'rxjs/Observable';
import { PgService } from 'app/shared/services/pg.service';
import { Injectable } from '@angular/core';
import { Headers} from '@angular/http';
import { DepartmentService } from 'app/shared/services/department.service';

@Injectable()
export class CommonService {
  users: User[] = [];
  accounts: Account[] = [];
  contacts: Contact[] = [];
  depts: Department[] = [];
  caseStatus: CaseStatus[] = [];

  constructor(public pg: PgService, public userServices: UserService, public accountService: AccountService, public contactServce: ContactService, public deptServce: DepartmentService) { 
    this.getAccounts();
    this.getUsers();
    this.getContacts();
    this.getDepartments();
    this.getCaseStatus();
    
  }
  
  getCaseStatus(){
    this.caseStatus.push({id: '40C3A4A9-F60C-4FFD-8CF8-100C6BED0647', name: 'Waiting', dateEntered: null, dateModified: null, modifiedUserId: '', createdBy: '', description: '', deleted: 0});
    this.caseStatus.push({id: '00E57127-9CC3-41F4-BEB3-064C02E14989', name: 'Proccessing', dateEntered: null, dateModified: null, modifiedUserId: '', createdBy: '', description: '', deleted: 0})
    this.caseStatus.push({id: '4FD839BD-188E-4329-B405-05002B95462D', name: 'Confirm Wating', dateEntered: null, dateModified: null, modifiedUserId: '', createdBy: '', description: '', deleted: 0})
    this.caseStatus.push({id: '0FF820F8-7CB7-4B38-A536-55ED04EEFB5B', name: 'Rejected', dateEntered: null, dateModified: null, modifiedUserId: '', createdBy: '', description: '', deleted: 0})
    this.caseStatus.push({id: '47AB1A0B-7D46-491C-9D75-63BD31F8C907', name: 'Closed', dateEntered: null, dateModified: null, modifiedUserId: '', createdBy: '', description: '', deleted: 0})
  }

  getStatus(id: string): CaseStatus{
    var st = this.caseStatus.filter(m => m.id == id)[0];
    if(st != undefined)
      return st;
    else
      return new CaseStatus();
  }

  getAccounts(){
    this.accountService.getAccounts()
    .then(result => {
      this.accounts = result;
    })
    .catch(error => {
      console.log(error);
    });
  }

  getAccount(id: string): Account{
    var ac = this.accounts.filter(m => m.id == id)[0];
    if(ac != undefined)
      return ac;
    else
      return new Account();
  }

  getContacts(){
    this.contactServce.getContacts()
    .then(result => {
      this.contacts = result;
    })
    .catch(error => {
      console.log(error);
    });
  }

  getContact(id: string): Contact{
    var c = this.contacts.filter(m => m.id == id)[0];
    if(c != undefined)
      return c;
    else
      return new Contact();
  }

  getUsers(){
    this.userServices.getUsers()
    .then(result => {
      this.users = result;
    })
    .catch(error => {
      console.log(error);
    });
  }

  getUser(id: string): User{
    var us = this.users.filter(m => m.id == id)[0];
    if(us != undefined)
      return us;
      else
    return new User();
  }

  getDepartments(){
    this.deptServce.getDepts()
    .then(result => {
      this.depts = result;
      console.log(this.depts);
    })
    .catch(error => {
      console.log(error);
    });
  }

  getDepartment(id: string): Department{
    console.log(this.depts);
    var dept = this.depts.filter(m => m.id == id)[0];
    if(dept != undefined)
      return dept;
    else
      return new Department();
  }

  EncodeMD5(str: string){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.pg.getString('users/md5/'+str, headers).map(res => {console.log(res); return res});
  }

  ConvertDateTimeToInt(date: Date) {
    return date.getTime();
  }

  ConvertIntToDateTime(value: number) {
    return new Date(value);
  }
  
  getUserId(){
    return localStorage.getItem('id')
  }

  getUserFullName(){
    return localStorage.getItem('fullName')
  }

  convertStringToDate(date: string){
    var d = new Date(date);
    return d.getFullYear() +'-'+ (d.getMonth() + 1) + '-' + d.getDate();
  }

  convertStringToTime(date: string){
    var d = new Date(date);
    return d.getHours() +':'+ d.getMinutes() + '-' + d.getSeconds();
  }
}

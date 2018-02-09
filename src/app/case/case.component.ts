import { DepartmentService } from './../shared/services/department.service';
import { Department } from './../shared/models/department';
import { ContactService } from 'app/shared/services/contact.service';
import { AccountJSon } from 'app/shared/models/account';
import { UserService } from './../shared/services/user.service';
import { Case } from 'app/shared/models/case';
import { Component, OnInit } from '@angular/core';
import { CaseService } from 'app/shared/services/case.service';
import { Router } from '@angular/router';
import { AccountService } from 'app/shared/services/account.service';
import { User } from 'app/shared/models/user';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss'],
  providers: [CaseService, AccountService, UserService, ContactService, DepartmentService], 
})
export class CaseComponent implements OnInit {
  cases: Case[] = [];

  //Pagination
  caseList: Case [];
  pages : number = 4;
  pageSize : number = 10;
  pageNumber : number = 0;
  currentIndex : number = 1;
  pagesIndex : Array<number>;
  pageStart : number = 1;
  record: number = 0;
  totalrecord: number = 0;

  openedSearchAdvanced: boolean = false;

  id: string;
  openedDelete: boolean = false;
  
  //search
  inputName : string = '';

  //Error
  errorDialog: boolean = false;
  contentError: string = "";
  users: User[] = [];

  //Account
  accounts: AccountJSon [] =[];

  listStatus: Array<{ text: string, value: string }> = [
    { text: "Waiting", value: '40C3A4A9-F60C-4FFD-8CF8-100C6BED0647' },
    { text: "Proccessing", value: '00E57127-9CC3-41F4-BEB3-064C02E14989' },
    { text: "Confirm Wating", value: '4FD839BD-188E-4329-B405-05002B95462D' },
    { text: "Rejected", value: '0FF820F8-7CB7-4B38-A536-55ED04EEFB5B' },
    { text: "Closed", value: '47AB1A0B-7D46-491C-9D75-63BD31F8C907' }
  ];

  constructor(public router: Router, private caseService: CaseService, private accountService: AccountService, private userService: UserService) { 
    this.onGetAccounts();
  }

  ngOnInit() {
    this.onGetUsers();
    this.onGetCases(0,1000);
  }

  private async onGetCases(index, pageSize){
    this.caseService.getCases(index, pageSize)
    .then(result => {
      this.cases = result;
      this.caseList = this.cases;
      this.totalrecord = this.caseList.length;
      this.init();
    })
    .catch(error => {
      console.log(error);
    });
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

  private async onGetAccounts(){
    this.accountService.getAccounts()
    .then(result => {
      this.accounts = result;
    })
    .catch(error => {
      console.log(error);
    });
  }

  private onGetAccountNameByID(id: string){
    var ac = this.accounts.filter(m => m.id == id)[0];
    if(ac != undefined)
      return ac.name;
    else
      return '';
  }

  onGetUserByUserID(id: string){
    if(id != null && id != ''){
      var u = this.users.find(item => item.id == id);
      if(u != undefined || u !=  null)
        return u.firstName + ' ' + u.lastName;
    }
      
    return '';
  }

  onGetStatusByID(id: string){
    if(id != null && id != ''){
      var st = this.listStatus.find(item => item.value == id);
      if(st != undefined || st !=  null)
        return st.text;
    }
      
    return '';
  }

  onCreateCase(){
    this.router.navigateByUrl("case/create-case");
  }

  onEditCase(id: string){
    this.router.navigate(["case/edit-case", id]);
  }

  onDetailCase(id: string){
    this.router.navigate(["case/detail-case", id]);
  }

  onSearchCase(){
    this.caseList = [];
    if(this.inputName != ""){
        this.cases.forEach(element => {
          if(element.subject != null)
            if(element.subject.toUpperCase().indexOf(this.inputName.toUpperCase())>=0){
              this.caseList.push(element);
            }
        });
    }else{
       this.caseList = this.cases;
    }
    this.init();
  }

  onShowDialogDeleteCase(id:string){
    this.id = id;
    this.openedDelete = true;
  }

  onCloseDialogDeleteCase(){
    this.openedDelete = false;
  }

  onDeleteCase(){
    this.onCloseDialogDeleteCase();
    this.caseService.deleteCase(this.id)
    .then(result => {
        this.cases = this.cases.filter(item => item.id !== this.id);
        this.caseList = this.caseList.filter(item => item.id !== this.id);
        this.refreshItems();
    })
    .catch(error => {
        this.errorDialog = true;
        this.contentError = error.status + " - " + error.statusText
    });
  }

  onCloseErrorDialog(){
    this.errorDialog = false;
  }

  init(){
    this.currentIndex = 1;
    this.pageStart = 1;
    this.pages = 4;

    this.pageNumber = parseInt(""+ (this.cases.length / this.pageSize));
    if(this.cases.length % this.pageSize != 0){
       this.pageNumber ++;
    }

    if(this.pageNumber  < this.pages){
          this.pages =  this.pageNumber;
    }
  
    this.refreshItems();
  }

  fillArray(): any{
    var obj = new Array();
    for(var index = this.pageStart; index< this.pageStart + this.pages; index ++) {
        obj.push(index);
    }
    return obj;
  }

  refreshItems(){
      this.caseList = this.cases.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
      this.pagesIndex =  this.fillArray();
      this.record = this.caseList.length;
      this.totalrecord = this.cases.length;
  }

  prevPage(){
    if(this.currentIndex>1){
      this.currentIndex --;
    } 
    if(this.currentIndex < this.pageStart){
      this.pageStart = this.currentIndex;
    }
    this.refreshItems();
  }

  nextPage(){
    if(this.currentIndex < this.pageNumber){
          this.currentIndex ++;
    }
    if(this.currentIndex >= (this.pageStart + this.pages)){
      this.pageStart = this.currentIndex - this.pages + 1;
    }

    this.refreshItems();
  }

  setPage(index : number){
    this.currentIndex = index;
    this.refreshItems();
  }

 onChange(newValue) {
   this.pageSize = + newValue || 0;

   this.init();
 }

 //Search
 onShowSearchAdvancedDialog(){
  this.openedSearchAdvanced = true;
 }

 closeSearchAdvancedDialog(){
  this.openedSearchAdvanced = false;
 }

  ConvertIntToDateTime(value: number) {
    var month = new Date(value).getMonth() + 1;
    var day = new Date(value).getDate();
    return new Date(value).getFullYear() + "-" + (month <= 9 ? "0" + month : month) + "-" + (day <= 9 ? "0" + day : day);
  }

  isNull(value){
    if(value == null)
      return '';
    return value;
  }
}

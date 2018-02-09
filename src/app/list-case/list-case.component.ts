import { DepartmentService } from './../shared/services/department.service';
import { Department } from './../shared/models/department';
import { UserService } from 'app/shared/services/user.service';
import { AccountJSon } from 'app/shared/models/account';
import { Router } from '@angular/router';
import { Case } from 'app/shared/models/case';
import { CommonService } from 'app/shared/services/common.service';
import { Component, OnInit } from '@angular/core';
import { PgService } from 'app/shared/services/pg.service';
import { CaseService } from 'app/shared/services/case.service';
import { AccountService } from 'app/shared/services/account.service';
import { ContactService } from 'app/shared/services/contact.service';

@Component({
  selector: 'app-waiting',
  templateUrl: 'list-case.component.html',
  styleUrls: ['list-case.component.scss'],
  providers: [PgService, CommonService, CaseService, AccountService, UserService, ContactService, DepartmentService]
})
export class ListCaseComponent implements OnInit {
  cases: Case[] = [];
  caseList: Case[] = [];
  casesPage: Case[] = [];
  public listStatus: Array<{ text: string, value: string }> = [
    { text: "Waiting", value: '40C3A4A9-F60C-4FFD-8CF8-100C6BED0647' },
    { text: "Proccessing", value: '00E57127-9CC3-41F4-BEB3-064C02E14989' },
    { text: "Confirm Wating", value: '4FD839BD-188E-4329-B405-05002B95462D' },
    { text: "Rejected", value: '0FF820F8-7CB7-4B38-A536-55ED04EEFB5B' },
    { text: "Closed", value: '47AB1A0B-7D46-491C-9D75-63BD31F8C907' }
  ];
  public selectedStatus: { text: string, value: string } = this.listStatus[0];

   //Pagination
   pages : number = 4;
   pageSize : number = 10;
   pageNumber : number = 0;
   currentIndex : number = 1;
   pagesIndex : Array<number>;
   pageStart : number = 1;
   record: number = 0;
   totalrecord: number = 0;

   //Account
  accounts: AccountJSon [] =[];
  constructor(public router: Router, private caseService: CaseService, private commonService: CommonService, private accountService: AccountService) { 
    this.onGetAccounts();
  }

  ngOnInit() {
    this.onGetCasesByUser(this.commonService.getUserId());
  }

  onGetCasesByUser(id: string){
    this.caseService.getCasesByUser(id)
    .then(result => {
      this.cases = result;
      this.caseList = result;
      this.casesPage = result;
      this.totalrecord = this.caseList.length;
      this.onGetCasesByDept('');
      
    })
    .catch(error =>{
      console.log(error);
    })
  }

  onGetCasesByDept(id: string){
    this.caseService.getCasesByDept('b00a145c-7e30-4268-b2e3-915cac66d374')
    .then(result => {
      result.forEach(element => {
        this.cases.push(element);
      });
      this.caseList = this.cases;
      this.casesPage = this.cases;
      this.totalrecord = this.caseList.length;
      this.onSelectCaseStatus(this.selectedStatus);
    })
    .catch(error =>{
      console.log(error);
    })
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

  onSelectCaseStatus(value: any){
    this.caseList = this.cases.filter(m => m.statusId == value.value);
    this.init();
  }

  init(){
    this.currentIndex = 1;
    this.pageStart = 1;
    this.pages = 4;

    this.pageNumber = parseInt(""+ (this.caseList.length / this.pageSize));
    if(this.caseList.length % this.pageSize != 0){
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
      this.casesPage = this.caseList.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
      this.pagesIndex =  this.fillArray();
      this.record = this.casesPage.length;
      this.totalrecord = this.caseList.length;
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

  ConvertIntToDateTime(value: number) {
    var month = new Date(value).getMonth() + 1;
    var day = new Date(value).getDate();
    return new Date(value).getFullYear() + "-" + (month <= 9 ? "0" + month : month) + "-" + (day <= 9 ? "0" + day : day);
  }

  onViewCase(id){
    this.router.navigate(["case/detail-case", id]);
  }
}

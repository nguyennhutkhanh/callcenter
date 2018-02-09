import { AccountContactService } from 'app/shared/services/account-contact.service';
import { AccountService } from './../shared/services/account.service';
import { AccountContact } from './../shared/models/account-contact';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-contact',
  templateUrl: './account-contact.component.html',
  styleUrls: ['./account-contact.component.scss'],
  providers: [ AccountContactService ], 
})
export class AccountContactComponent implements OnInit {
  accountContacts: AccountContact[] = [];

  //Pagination
  accountContactsList: AccountContact [];
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

  constructor(public router: Router, private accountContactService: AccountContactService) { }

  ngOnInit() {
    this.onGetAccountContacts();
  }

  private onGetAccountContacts(){
    this.accountContactService.getAccountContacts()
    .then(result => {
      this.accountContacts = result;
      this.accountContactsList = this.accountContacts;
      this.totalrecord = this.accountContactsList.length;
      this.init();
    })
    .catch(error => {
      console.log(error);
    });
  }

  onCreateAccountContact(){
    this.router.navigateByUrl("account-contact/create-account-contact");
  }

  onEditAccountContact(id: string){
    this.router.navigate(["account-contact/edit-account-contact", id]);
  }

  onDetailAccount(id: string){
    this.router.navigate(["account-contact/detail-account-contact", id]);
  }

  onSearchAccountContact(){
    
  }

  onShowDialogDeleteAccountContact(id:string){
    this.id = id;
    this.openedDelete = true;
  }

  onCloseDialogDeleteAccountContact(){
    this.openedDelete = false;
  }

  onDeleteAccount(){
    this.onCloseDialogDeleteAccountContact();
    this.accountContactService.deleteAccountContact(this.id)
    .then(result => {
      if(result.status == 200){
        this.accountContacts = this.accountContacts.filter(item => item.id !== this.id);
        this.accountContactsList = this.accountContactsList.filter(item => item.id !== this.id);
        this.refreshItems();
      }
    })
    .catch(error => {
      if(error.status == undefined){
        this.accountContacts = this.accountContacts.filter(item => item.id !== this.id);
        this.accountContactsList = this.accountContactsList.filter(item => item.id !== this.id);
        this.refreshItems();
      }else{
        this.errorDialog = true;
        this.contentError = error.status + " - " + error.statusText
      }
    });
  }

  onCloseErrorDialog(){
    this.errorDialog = false;
  }

  init(){
    this.currentIndex = 1;
    this.pageStart = 1;
    this.pages = 4;

    this.pageNumber = parseInt(""+ (this.accountContacts.length / this.pageSize));
    if(this.accountContacts.length % this.pageSize != 0){
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
      this.accountContactsList = this.accountContactsList.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
      this.pagesIndex =  this.fillArray();
      this.record = this.accountContactsList.length;
      this.totalrecord = this.accountContactsList.length;
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

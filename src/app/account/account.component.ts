import { User } from './../shared/models/user';
import { UserService } from './../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/shared/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [AccountService, UserService], 
})
export class AccountComponent implements OnInit {
  accounts: Account[] = [];

  //Pagination
  accountList: Account [];
  pages : number = 4;
  pageSize : number = 10;
  pageNumber : number = 0;
  currentIndex : number = 1;
  pagesIndex : Array<number>;
  pageStart : number = 1;
  record: number = 0;
  totalrecord: number = 0;

  id: string;
  openedDelete: boolean = false;
  
  //search
  inputName : string = '';

  //Error
  errorDialog: boolean = false;
  contentError: string = "";

  users: User[] = [];
  constructor(public router: Router, private accountService: AccountService, private userService: UserService) {
    this.onGetUsers();
   }

  ngOnInit() {
    this.onGetAccounts();
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
    console.log("User: " + id);
    console.log("Users:");
    console.log(this.users);
    if(id != null && id != ''){
      var u = this.users.find(item => item.id == id);
      if(u != undefined || u !=  null)
        return u.firstName + ' ' + u.lastName;
    }
      
    return '';
  }

  private async onGetAccounts(){
    this.accountService.getAccounts()
    .then(result => {
      this.accounts = result;
      this.accountList = this.accounts;
      this.totalrecord = this.accountList.length;
      this.init();
    })
    .catch(error => {
      console.log(error);
    });
  }

  private async onGetUser(id: string){
    this.userService.getUser(id)
    .then(result => {
      result.name;
    })
    .catch(error => {
      return '';
    });
  }

  onCreateAccount(){
    this.router.navigateByUrl("account/create-account");
  }

  onEditAccount(id: string){
    this.router.navigate(["account/edit-account", id]);
  }

  onDetailAccount(id: string){
    this.router.navigate(["account/detail-account", id]);
  }

  onSearchAccount(){
    this.accountList = [];
    if(this.inputName != ""){
        this.accounts.forEach(element => {
            if(element.name.toUpperCase().indexOf(this.inputName.toUpperCase())>=0){
              this.accountList.push(element);
            }            
        });
        this.accounts = this.accountList;
        this.init();
    }else{
       this.onGetAccounts();
    }
    
  }

  onShowDialogDeleteAccount(id:string){
    this.id = id;
    this.openedDelete = true;
  }

  onCloseDialogDeleteAccount(){
    this.openedDelete = false;
  }

  onDeleteAccount(){
    this.onCloseDialogDeleteAccount();
    this.accountService.deleteAccount(this.id)
    .then(result => {
        this.accounts = this.accounts.filter(item => item.id !== this.id);
        this.accountList = this.accountList.filter(item => item.id !== this.id);
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

    this.pageNumber = parseInt(""+ (this.accounts.length / this.pageSize));
    if(this.accounts.length % this.pageSize != 0){
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
      this.accountList = this.accounts.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
      this.pagesIndex =  this.fillArray();
      this.record = this.accountList.length;
      this.totalrecord = this.accounts.length;
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
 onShowSearchAdvanced(){
  this.router.navigateByUrl("account/advanced-search-account");
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

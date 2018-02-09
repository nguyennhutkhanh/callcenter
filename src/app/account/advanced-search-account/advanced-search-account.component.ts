import { UserService } from 'app/shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/shared/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advanced-search-account',
  templateUrl: './advanced-search-account.component.html',
  styleUrls: ['./advanced-search-account.component.scss'],
  providers: [AccountService, UserService], 
})
export class AdvancedSearchAccountComponent implements OnInit {
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
  
  //search advanced
  firstName: string = "";
  lastName: string = "";
  userName: string = "";
  phone: string = "";

  public listItems: Array<{ text: string, value: boolean }> = [
    { text: "Yes", value: true },
      { text: "No", value: false },
  ];
  public isAdmin: { text: string, value: boolean } = this.listItems[0];

  //Error
  errorDialog: boolean = false;
  contentError: string = "";

  constructor(public router: Router, private accountService: AccountService, private userService: UserService) { }

  ngOnInit() {
    this.onGetAccounts();
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


  onEditAccount(id: string){
    this.router.navigate(["account/edit-account", id]);
  }

  onDetailAccount(id: string){
    this.router.navigate(["account/detail-account", id]);
  }

  onSearchAccount(){
    var u = 	{ "firstName": this.firstName,
                  "lastName":this.lastName,
                  "userName": this.userName,
                  "phone": this.phone,
                "admin": this.isAdmin.value
              };
    this.accountService.advancedSearchAccount(u)
    .then(result => {
      this.accounts = result;
      this.accountList = this.accounts;
      this.totalrecord = this.accountList.length;
      this.init();
    })
    .catch(error => {
      console.log(error);
    });
    this.init();
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
      if(result.status == 200){
        this.accounts = this.accounts.filter(item => item.id !== this.id);
        this.accountList = this.accountList.filter(item => item.id !== this.id);
        this.refreshItems();
      }
    })
    .catch(error => {
      if(error.status == undefined){
        this.accounts = this.accounts.filter(item => item.id !== this.id);
        this.accountList = this.accountList.filter(item => item.id !== this.id);
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
      this.accountList = this.accountList.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
      this.pagesIndex =  this.fillArray();
      this.record = this.accountList.length;
      this.totalrecord = this.accountList.length;
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

  //Search
 onShowSearchBasic(){
  this.router.navigateByUrl("account");
 }

 onClear(){
   this.firstName = "";
   this.lastName = "";
   this.userName = "";
   this.phone = "";
   this.isAdmin = this.listItems[0];
 }
}

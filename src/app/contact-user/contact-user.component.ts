import { Component, OnInit } from '@angular/core';
import { ContactUserService } from 'app/shared/services/contact-user.service';
import { ContactUser } from 'app/shared/models/contact-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-user',
  templateUrl: './contact-user.component.html',
  styleUrls: ['./contact-user.component.scss'],
  providers: [ ContactUserService ], 
})
export class ContactUserComponent implements OnInit {
  contactUsers: ContactUser[] = [];

  //Pagination
  contactUserList: ContactUser [];
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

  constructor(public router: Router, private callContactService: ContactUserService) { }

  ngOnInit() {
    this.onGetContactUsers();
  }

  private async onGetContactUsers(){
    this.callContactService.getContactUsers()
    .then(result => {
      this.contactUsers = result;
      this.contactUserList = this.contactUsers;
      this.totalrecord = this.contactUserList.length;
      this.init();
    })
    .catch(error => {
      console.log(error);
    });
  }

  onCreateContactUser(){
    this.router.navigateByUrl("contact-user/create-contact-user");
  }

  onEditContactUser(id: string){
    this.router.navigate(["contact-user/edit-contact-user", id]);
  }

  onDetailContactUser(id: string){
    this.router.navigate(["contact-user/detail-contact-user", id]);
  }

  onSearchContactUser(){
    
  }

  onShowDialogDeleteCallContact(id:string){
    this.id = id;
    this.openedDelete = true;
  }

  onCloseDialogDeleteCallContact(){
    this.openedDelete = false;
  }

  onDeleteCallContact(){
    this.onCloseDialogDeleteCallContact();
    this.callContactService.deleteContactUser(this.id)
    .then(result => {
      if(result.status == 200){
        this.contactUsers = this.contactUsers.filter(item => item.id !== this.id);
        this.contactUserList = this.contactUserList.filter(item => item.id !== this.id);
        this.refreshItems();
      }
    })
    .catch(error => {
      if(error.status == undefined){
        this.contactUsers = this.contactUsers.filter(item => item.id !== this.id);
        this.contactUserList = this.contactUserList.filter(item => item.id !== this.id);
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

    this.pageNumber = parseInt(""+ (this.contactUsers.length / this.pageSize));
    if(this.contactUsers.length % this.pageSize != 0){
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
      this.contactUserList = this.contactUserList.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
      this.pagesIndex =  this.fillArray();
      this.record = this.contactUserList.length;
      this.totalrecord = this.contactUserList.length;
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

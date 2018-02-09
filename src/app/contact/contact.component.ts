import { UserService } from './../shared/services/user.service';
import { Contact } from 'app/shared/models/contact';
import { Component, OnInit } from '@angular/core';
import { ContactService } from 'app/shared/services/contact.service';
import { Router } from '@angular/router';
import { User } from 'app/shared/models/user';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [ContactService, UserService], 
})
export class ContactComponent implements OnInit {
  contacts: Contact[] = [];

  //Pagination
  contactList: Contact [];
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
  constructor(public router: Router, private contactService: ContactService, private userService: UserService) { 
    this.onGetUsers();
  }

  ngOnInit() {
    this.onGetContacts();
  }

  private async onGetUsers(){
    this.userService.getUsers()
    .then(result => {
      this.users = result;
    })
    .catch(error => {
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

  private async onGetContacts(){
    this.contactService.getContacts()
    .then(result => {
      this.contacts = result;
      console.log(this.contacts);
      this.contactList = this.contacts;
      this.totalrecord = this.contactList.length;
      this.init();
    })
    .catch(error => {
      console.log(error);
    });
  }

  onCreateContact(){
    this.router.navigateByUrl("contact/create-contact");
  }

  onEditContact(id: string){
    this.router.navigate(["contact/edit-contact", id]);
  }

  onDetailContact(id: string){
    this.router.navigate(["contact/detail-contact", id]);
  }

  onSearchContact(){
    this.contactList = [];
    if(this.inputName != ""){
        this.contacts.forEach(element => {
            if(element.firstName.toUpperCase().indexOf(this.inputName.toUpperCase())>=0 || element.lastName.toUpperCase().indexOf(this.inputName.toUpperCase())>=0){
              this.contactList.push(element);
            }
        });
        this.contacts = this.contactList;
        this.init();
    }else{
       this.onGetContacts();
    }
    
  }

  onShowDialogDeleteContact(id:string){
    this.id = id;
    this.openedDelete = true;
  }

  onCloseDialogDeleteContact(){
    this.openedDelete = false;
  }

  onDeleteContact(){
    this.onCloseDialogDeleteContact();
    this.contactService.deleteContact(this.id)
    .then(result => {
        this.contacts = this.contacts.filter(item => item.id !== this.id);
        this.contactList = this.contactList.filter(item => item.id !== this.id);
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

    this.pageNumber = parseInt(""+ (this.contacts.length / this.pageSize));
    if(this.contacts.length % this.pageSize != 0){
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
      this.contactList = this.contacts.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
      this.pagesIndex =  this.fillArray();
      this.record = this.contactList.length;
      this.totalrecord = this.contacts.length;
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
  this.router.navigateByUrl("contact/advanced-search-contact");
 }

 ConvertIntToDateTime(value: number) {
    var month = new Date(value).getMonth() + 1;
    var day = new Date(value).getDate();
    return new Date(value).getFullYear() + "-" + (month <= 9 ? "0" + month : month) + "-" + (day <= 9 ? "0" + day : day);
  }
}

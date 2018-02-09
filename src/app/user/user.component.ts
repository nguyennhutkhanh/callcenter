import { User } from './../shared/models/user';
import { UserService } from './../shared/services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserService], 
})
export class UserComponent implements OnInit {
  users: User[] = [];

  //Pagination
  userList: User [];
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

  constructor(public router: Router, private userService: UserService) { }

  ngOnInit() {
    this.onGetUsers();
  }

  private async onGetUsers(){
    this.userService.getUsers()
    .then(result => {
      this.users = result;
      this.userList = this.users;
      this.totalrecord = this.userList.length;
      this.init();
    })
    .catch(error => {
      console.log(error);
    });
  }

  onCreateUser(){
    this.router.navigateByUrl("user/create-user");
  }

  onEditUser(id: string){
    this.router.navigate(["user/edit-user", id]);
  }

  onDetailUser(id: string){
    this.router.navigate(["user/user-detail", id]);
  }

  onSearchUser(){
    this.userList = [];
    if(this.inputName != ""){
        this.users.forEach(element => {
            if(element.firstName.toUpperCase().indexOf(this.inputName.toUpperCase())>=0 || element.lastName.toUpperCase().indexOf(this.inputName.toUpperCase())>=0){
              this.userList.push(element);
            }
        });
    }else{
        this.userList = this.users;
    }
    this.init();
  }

  onShowDialogDeleteUser(id:string){
    this.id = id;
    this.openedDelete = true;
  }

  onCloseDialogDeleteUser(){
    this.openedDelete = false;
  }

  onDeleteUser(){
    this.onCloseDialogDeleteUser();
    this.userService.deleteUser(this.id)
    .then(result => {
        this.users = this.users.filter(item => item.id !== this.id);
        this.userList = this.userList.filter(item => item.id !== this.id);
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

    this.pageNumber = parseInt(""+ (this.users.length / this.pageSize));
    if(this.users.length % this.pageSize != 0){
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
      this.userList = this.users.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
      this.pagesIndex =  this.fillArray();
      this.record = this.userList.length;
      this.totalrecord = this.users.length;
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
  this.router.navigateByUrl("user/advanced-search-user");
 }

 closeSearchAdvancedDialog(){
  this.openedSearchAdvanced = false;
 }
}

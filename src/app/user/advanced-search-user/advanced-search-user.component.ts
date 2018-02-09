import { User } from './../../shared/models/user';
import { Router } from '@angular/router';
import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advanced-search-user',
  templateUrl: './advanced-search-user.component.html',
  styleUrls: ['./advanced-search-user.component.scss'],
  providers: [UserService], 
})
export class AdvancedSearchUserComponent implements OnInit {
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

  id: string;
  openedDelete: boolean = false;

  //Error
  errorDialog: boolean = false;
  contentError: string = "";

  //search advanced
  firstName: string = "";
  lastName: string = "";
  userName: string = "";
  phone: string = "";

  public listItems: Array<{ text: string, value: number }> = [
    { text: "Yes", value: 1 },
      { text: "No", value: 0 },
  ];
  public isAdmin: { text: string, value: number } = this.listItems[0];
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

  onEditUser(id: string){
    this.router.navigate(["user/edit-user", id]);
  }

  onDetailUser(id: string){
    this.router.navigate(["user/user-detail", id]);
  }

  onSearchUser(){
    var u = 	{ "firstName": this.firstName,
                  "lastName":this.lastName,
                  "userName": this.userName,
                  "phone": this.phone,
                "admin": this.isAdmin.value
              };
    this.userService.advancedSearchUser(u)
    .then(result => {
      this.users = result;
      this.userList = this.users;
      this.totalrecord = this.userList.length;
      this.init();
    })
    .catch(error => {
      this.users = [];
      this.userList = [];
      this.totalrecord = this.userList.length;
      this.init();
    });
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
      if(result.status == 200){
        this.users = this.users.filter(item => item.id !== this.id);
        this.userList = this.userList.filter(item => item.id !== this.id);
        this.refreshItems();
      }
    })
    .catch(error => {
      if(error.status == undefined){
        this.users = this.users.filter(item => item.id !== this.id);
        this.userList = this.userList.filter(item => item.id !== this.id);
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
      this.userList = this.userList.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
      this.pagesIndex =  this.fillArray();
      this.record = this.userList.length;
      this.totalrecord = this.userList.length;
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
 onShowSearchBasic(){
  this.router.navigateByUrl("user");
 }

 onClear(){
   this.firstName = "";
   this.lastName = "";
   this.userName = "";
   this.phone = "";
   this.isAdmin = this.listItems[0];
 }
}

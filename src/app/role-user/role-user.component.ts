import { RoleUser } from './../shared/models/role-user';
import { RoleUserService } from './../shared/services/role-user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router/src/router';

@Component({
  selector: 'app-role-user',
  templateUrl: './role-user.component.html',
  styleUrls: ['./role-user.component.scss'],
  providers: [RoleUserService], 
})
export class RoleUserComponent implements OnInit {
  roleUsers: RoleUser[] = [];

  //Pagination
  roleUserList: RoleUser [];
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

  constructor(public router: Router, private roleUserService: RoleUserService) { }

  ngOnInit() {
    this.onGetRoleUsers();
  }

  private async onGetRoleUsers(){
    this.roleUserService.getRoleUsers()
    .then(result => {
      this.roleUsers = result;
      this.roleUserList = this.roleUsers;
      this.totalrecord = this.roleUserList.length;
      this.init();
    })
    .catch(error => {
      console.log(error);
    });
  }

  onCreateRoleUser(){
    this.router.navigateByUrl("role-user/create-role-user");
  }

  onEditRoleUser(id: string){
    this.router.navigate(["role-user/edit-role-user", id]);
  }

  onDetailRoleUser(id: string){
    this.router.navigate(["role-user/detail-role-user", id]);
  }

  onSearchCallContact(){
    
  }

  onShowDialogDeleteRoleUser(id:string){
    this.id = id;
    this.openedDelete = true;
  }

  onCloseDialogDeleteRoleUser(){
    this.openedDelete = false;
  }

  onDeleteRoleUser(){
    this.onCloseDialogDeleteRoleUser();
    this.roleUserService.deleteRoleUser(this.id)
    .then(result => {
      if(result.status == 200){
        this.roleUsers = this.roleUsers.filter(item => item.id !== this.id);
        this.roleUserList = this.roleUserList.filter(item => item.id !== this.id);
        this.refreshItems();
      }
    })
    .catch(error => {
      if(error.status == undefined){
        this.roleUsers = this.roleUsers.filter(item => item.id !== this.id);
        this.roleUserList = this.roleUserList.filter(item => item.id !== this.id);
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

    this.pageNumber = parseInt(""+ (this.roleUsers.length / this.pageSize));
    if(this.roleUsers.length % this.pageSize != 0){
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
      this.roleUserList = this.roleUserList.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
      this.pagesIndex =  this.fillArray();
      this.record = this.roleUserList.length;
      this.totalrecord = this.roleUserList.length;
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

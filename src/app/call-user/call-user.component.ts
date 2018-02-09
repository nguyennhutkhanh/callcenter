import { CallUserService } from './../shared/services/call-user.service';
import { Component, OnInit } from '@angular/core';
import { CallUser } from 'app/shared/models/call-user';
import { Router } from '@angular/router/src/router';

@Component({
  selector: 'app-call-user',
  templateUrl: './call-user.component.html',
  styleUrls: ['./call-user.component.scss'],
  providers: [CallUserService], 
})
export class CallUserComponent implements OnInit {
  callUsers: CallUser[] = [];

  //Pagination
  callUserList: CallUser [];
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

  constructor(public router: Router, private callUserService: CallUserService) { }

  ngOnInit() {
    this.onGetCallUsers();
  }

  private async onGetCallUsers(){
    this.callUserService.getCallUsers()
    .then(result => {
      this.callUsers = result;
      this.callUserList = this.callUsers;
      this.totalrecord = this.callUserList.length;
      this.init();
    })
    .catch(error => {
      console.log(error);
    });
  }

  onCreateCallUser(){
    this.router.navigateByUrl("call-user/create-call-user");
  }

  onEditCallUser(id: string){
    this.router.navigate(["call-user/edit-call-user", id]);
  }

  onDetailCallUser(id: string){
    this.router.navigate(["call-user/detail-call-user", id]);
  }

  onSearchCallUser(){
    
  }

  onShowDialogDeleteCallUser(id:string){
    this.id = id;
    this.openedDelete = true;
  }

  onCloseDialogDeleteCallUser(){
    this.openedDelete = false;
  }

  onDeleteCallUser(){
    this.onCloseDialogDeleteCallUser();
    this.callUserService.deleteCallUser(this.id)
    .then(result => {
      if(result.status == 200){
        this.callUsers = this.callUsers.filter(item => item.id !== this.id);
        this.callUserList = this.callUserList.filter(item => item.id !== this.id);
        this.refreshItems();
      }
    })
    .catch(error => {
      if(error.status == undefined){
        this.callUsers = this.callUsers.filter(item => item.id !== this.id);
        this.callUserList = this.callUserList.filter(item => item.id !== this.id);
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

    this.pageNumber = parseInt(""+ (this.callUsers.length / this.pageSize));
    if(this.callUsers.length % this.pageSize != 0){
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
      this.callUserList = this.callUserList.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
      this.pagesIndex =  this.fillArray();
      this.record = this.callUserList.length;
      this.totalrecord = this.callUserList.length;
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

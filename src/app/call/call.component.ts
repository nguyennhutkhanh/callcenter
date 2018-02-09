import { User} from './../shared/models/user';
import { UserService } from 'app/shared/services/user.service';
import { CallJSon } from './../shared/models/call';
import { CallService } from 'app/shared/services/call.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss'],
  providers: [CallService, UserService], 
})
export class CallComponent implements OnInit {

  calls: CallJSon[] = [];
  users: User[] = [];
  //Pagination
  callList: CallJSon [];
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

  constructor(public router: Router, private callService: CallService, private userService: UserService) { 
    this.onGetUsers();
  }

  ngOnInit() {
    this.onGetCalls();
  }

  private async onGetCalls(){
    this.callService.getCalls()
    .then(result => {
      this.calls = result;
      this.callList = this.calls;
      this.totalrecord = this.callList.length;
      this.init();
    })
    .catch(error => {
      console.log(error);
    });
  }

  private async onGetUsers(){
    this.userService.getUsers()
    .then(result => {
      this.users = result;
    })
    .catch(error => {
      console.log(error);
    });
  }

  onCreateCall(){
    this.router.navigateByUrl("call/create-call");
  }

  onEditCall(id: string){
    this.router.navigate(["call/edit-call", id]);
  }

  onDetailCall(id: string){
    this.router.navigate(["call/detail-call", id]);
  }

  onCreateCase(id: string){
    this.router.navigate(["case/create-case", id]);
  }

  onSearchCall(){
    this.callList = [];
    if(this.inputName != ""){
        this.calls.forEach(element => {
          // if(element.name != null)
          //   if(element.name.toUpperCase().indexOf(this.inputName.toUpperCase())>=0){
          //     this.callList.push(element);
          //   }
        });
    }else{
       this.callList = this.calls;
    }
    this.init();
  }

  onShowDialogDeleteCall(id:string){
    this.id = id;
    this.openedDelete = true;
  }

  onCloseDialogDeleteCall(){
    this.openedDelete = false;
  }

  onDeleteCall(){
    this.onCloseDialogDeleteCall();
    this.callService.deleteCall(this.id)
    .then(result => {
        this.calls = this.calls.filter(item => item.id !== this.id);
        this.callList = this.callList.filter(item => item.id !== this.id);
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

    this.pageNumber = parseInt(""+ (this.calls.length / this.pageSize));
    if(this.calls.length % this.pageSize != 0){
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
      this.callList = this.callList.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
      this.pagesIndex =  this.fillArray();
      this.record = this.callList.length;
      this.totalrecord = this.callList.length;
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
    if(value == null){
      return '';
    }
    var month = new Date(value).getMonth() + 1;
    var day = new Date(value).getDate();
    return new Date(value).getFullYear() + "-" + (month <= 9 ? "0" + month : month) + "-" + (day <= 9 ? "0" + day : day);
  }

  isNull(value){
    if(value == null)
      return '';
    return value;
  }

  getUser(userid: string){
    var us = this.users.filter(m => m.id == userid)[0];
    if(us == undefined)
      return '';
    else
      return us.firstName + ' ' + us.lastName;
  }
}

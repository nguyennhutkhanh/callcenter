import { ProjectUserService } from './../shared/services/project-user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectUser } from 'app/shared/models/project-user';

@Component({
  selector: 'app-project-user',
  templateUrl: './project-user.component.html',
  styleUrls: ['./project-user.component.scss'],
  providers: [ProjectUserService], 
})
export class ProjectUserComponent implements OnInit {
  projectUsers: ProjectUser[] = [];

  //Pagination
  projectUserList: ProjectUser [];
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

  constructor(public router: Router, private projectUserService: ProjectUserService) { }

  ngOnInit() {
    this.onGetProjectUsers();
  }

  private async onGetProjectUsers(){
    this.projectUserService.getProjectUsers()
    .then(result => {
      this.projectUsers = result;
      this.projectUserList = this.projectUsers;
      this.totalrecord = this.projectUserList.length;
      this.init();
    })
    .catch(error => {
      console.log(error);
    });
  }

  onCreateProjectUser(){
    this.router.navigateByUrl("project-user/create-project-user");
  }

  onEditProjectUser(id: string){
    this.router.navigate(["project-user/edit-project-user", id]);
  }

  onDetailProjectUser(id: string){
    this.router.navigate(["project-user/detail-project-user", id]);
  }

  onSearchProjectUser(){
    
  }

  onShowDialogDeleteProjectUser(id:string){
    this.id = id;
    this.openedDelete = true;
  }

  onCloseDialogDeleteProjectUser(){
    this.openedDelete = false;
  }

  onDeleteProjectUser(){
    this.onCloseDialogDeleteProjectUser();
    this.projectUserService.deleteProjectUser(this.id)
    .then(result => {
      if(result.status == 200){
        this.projectUsers = this.projectUsers.filter(item => item.id !== this.id);
        this.projectUserList = this.projectUserList.filter(item => item.id !== this.id);
        this.refreshItems();
      }
    })
    .catch(error => {
      if(error.status == undefined){
        this.projectUsers = this.projectUsers.filter(item => item.id !== this.id);
        this.projectUserList = this.projectUserList.filter(item => item.id !== this.id);
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

    this.pageNumber = parseInt(""+ (this.projectUsers.length / this.pageSize));
    if(this.projectUsers.length % this.pageSize != 0){
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
      this.projectUserList = this.projectUserList.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
      this.pagesIndex =  this.fillArray();
      this.record = this.projectUserList.length;
      this.totalrecord = this.projectUserList.length;
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

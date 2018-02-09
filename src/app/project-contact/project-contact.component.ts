import { ProjectContactService } from './../shared/services/project-contact.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router/src/router';
import { ProjectContact } from 'app/shared/models/project-contact';

@Component({
  selector: 'app-project-contact',
  templateUrl: './project-contact.component.html',
  styleUrls: ['./project-contact.component.scss'],
  providers: [ProjectContactService], 
})
export class ProjectContactComponent implements OnInit {
  projectContacts: ProjectContact[] = [];

  //Pagination
  projectContactList: ProjectContact [];
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

  constructor(public router: Router, private projectContactService: ProjectContactService) { }

  ngOnInit() {
    this.onGetCallContacts();
  }

  private async onGetCallContacts(){
    this.projectContactService.getProjectContacts()
    .then(result => {
      this.projectContacts = result;
      this.projectContactList = this.projectContacts;
      this.totalrecord = this.projectContactList.length;
      this.init();
    })
    .catch(error => {
      console.log(error);
    });
  }

  onCreateCallContact(){
    this.router.navigateByUrl("project-contact/create-project-contact");
  }

  onEditCallContact(id: string){
    this.router.navigate(["project-contact/edit-project-contact", id]);
  }

  onDetailCallContact(id: string){
    this.router.navigate(["project-contact/detail-project-contact", id]);
  }

  onSearchCallContact(){
    
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
    this.projectContactService.deleteProjectContact(this.id)
    .then(result => {
      if(result.status == 200){
        this.projectContacts = this.projectContacts.filter(item => item.id !== this.id);
        this.projectContactList = this.projectContactList.filter(item => item.id !== this.id);
        this.refreshItems();
      }
    })
    .catch(error => {
      if(error.status == undefined){
        this.projectContacts = this.projectContacts.filter(item => item.id !== this.id);
        this.projectContactList = this.projectContactList.filter(item => item.id !== this.id);
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

    this.pageNumber = parseInt(""+ (this.projectContacts.length / this.pageSize));
    if(this.projectContacts.length % this.pageSize != 0){
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
      this.projectContactList = this.projectContactList.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
      this.pagesIndex =  this.fillArray();
      this.record = this.projectContactList.length;
      this.totalrecord = this.projectContactList.length;
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

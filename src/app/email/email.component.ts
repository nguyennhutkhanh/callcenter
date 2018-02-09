import { Component, OnInit } from '@angular/core';
import { EmailService } from 'app/shared/services/email.service';
import { Email } from 'app/shared/models/email';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  providers: [EmailService]
})
export class EmailComponent implements OnInit {

  emails: Email[] = [];

  //Pagination
  emailList: Email [];
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

  constructor(public router: Router, private emailService: EmailService) { }

  ngOnInit() {
    this.onGetEmails();
  }

  private async onGetEmails(){
    this.emailService.getEmails()
    .then(result => {
      this.emails = result;
      this.emailList = this.emails;
      this.totalrecord = this.emailList.length;
      this.init();
    })
    .catch(error => {
      console.log(error);
    });
  }

  onCreateEmail(){
    this.router.navigateByUrl("email/create-email");
  }

  onEditEmail(id: string){
    this.router.navigate(["email/edit-email", id]);
  }

  onDetailEmail(id: string){
    this.router.navigate(["email/detail-email", id]);
  }

  onSearchEmail(){
    this.emailList = [];
    if(this.inputName != ""){
        this.emails.forEach(element => {
            if(element.name.toUpperCase().indexOf(this.inputName.toUpperCase())>=0){
              this.emailList.push(element);
            }
        });
    }else{
       this.emailList = this.emails;
    }
    this.init();
  }

  onShowDialogDeleteEmail(id:string){
    this.id = id;
    this.openedDelete = true;
  }

  onCloseDialogDeleteEmail(){
    this.openedDelete = false;
  }

  onDeleteEmail(){
    this.onCloseDialogDeleteEmail();
    this.emailService.deleteEmail(this.id)
    .then(result => {
      if(result.status == 200){
        this.emails = this.emails.filter(item => item.id !== this.id);
        this.emailList = this.emailList.filter(item => item.id !== this.id);
        this.refreshItems();
      }
    })
    .catch(error => {
      if(error.status == undefined){
        this.emails = this.emails.filter(item => item.id !== this.id);
        this.emailList = this.emailList.filter(item => item.id !== this.id);
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

    this.pageNumber = parseInt(""+ (this.emails.length / this.pageSize));
    if(this.emails.length % this.pageSize != 0){
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
      this.emailList = this.emailList.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
      this.pagesIndex =  this.fillArray();
      this.record = this.emailList.length;
      this.totalrecord = this.emailList.length;
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

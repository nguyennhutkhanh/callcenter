import { UserService } from 'app/shared/services/user.service';
import { AccountService } from './../shared/services/account.service';
import { ContactService } from 'app/shared/services/contact.service';
import { CommonService } from 'app/shared/services/common.service';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { DepartmentService } from 'app/shared/services/department.service';
import { Department } from 'app/shared/models/department';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
  providers: [CommonService, DepartmentService, ContactService, AccountService, UserService], 
})
export class DepartmentComponent implements OnInit {
    depts: Department[] = [];

  //Pagination
  deptsList: Department [];
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
  constructor(public router: Router, private commonService: CommonService, private deptService: DepartmentService) {
    
   }

    ngOnInit(): void {
        this.onGetDepts();
    }
    private async onGetDepts(){
    this.deptService.getDepts()
    .then(result => {
        this.depts = result;
        this.deptsList = result;
        this.totalrecord = this.deptsList.length;
        this.init();
    })
    .catch(error => {
        console.log(error);
    });
    }

    onCreateDept(){
        this.router.navigateByUrl("department/create-department");
    }

    onEditDept(id: string){
        this.router.navigate(["department/edit-department", id]);
    }

    onDetailDept(id: string){
        this.router.navigate(["department/detail-department", id]);
    }

    onSearchDept(){
    this.deptsList = [];
    if(this.inputName != ""){
        this.depts.forEach(element => {
            if(element.name.toUpperCase().indexOf(this.inputName.toUpperCase())>=0){
                this.deptsList.push(element);
            }            
        });
        this.depts = this.deptsList;
        this.init();
    }else{
        this.onGetDepts();
    }
    
    }

    onShowDialogDeleteDept(id:string){
    this.id = id;
    this.openedDelete = true;
    }

    onCloseDialogDeleteDept(){
    this.openedDelete = false;
    }

    onDeleteDept(){
    this.onCloseDialogDeleteDept();
    this.deptService.deleteDept(this.id)
    .then(result => {
        this.depts = this.depts.filter(item => item.id !== this.id);
        this.deptsList = this.deptsList.filter(item => item.id !== this.id);
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

    this.pageNumber = parseInt(""+ (this.depts.length / this.pageSize));
    if(this.depts.length % this.pageSize != 0){
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
        this.deptsList = this.depts.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
        this.pagesIndex =  this.fillArray();
        this.record = this.deptsList.length;
        this.totalrecord = this.depts.length;
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
}

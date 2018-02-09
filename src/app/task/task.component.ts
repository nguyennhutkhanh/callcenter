import { Task } from './../shared/models/task';
import { TaskService } from 'app/shared/services/task.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  providers: [TaskService], 
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];

  //Pagination
  taskList: Task [];
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

  constructor(public router: Router, private taskService: TaskService) { }

  ngOnInit() {
    this.onGetTasks();
  }

  private async onGetTasks(){
    this.taskService.getTasks()
    .then(result => {
      this.tasks = result;
      this.taskList = this.tasks;
      this.totalrecord = this.taskList.length;
      this.init();
    })
    .catch(error => {
      console.log(error);
    });
  }

  onCreateTask(){
    this.router.navigateByUrl("task/create-task");
  }

  onEditTask(id: string){
    this.router.navigate(["task/edit-task", id]);
  }

  onDetailTask(id: string){
    this.router.navigate(["task/detail-task", id]);
  }

  onSearchTask(){

  }

  onShowDialogDeleteTask(id:string){
    this.id = id;
    this.openedDelete = true;
  }

  onCloseDialogDeleteTask(){
    this.openedDelete = false;
  }

  onDeleteTask(){
    this.onCloseDialogDeleteTask();
    this.taskService.deleteTask(this.id)
    .then(result => {
      if(result.status == 200){
        this.tasks = this.tasks.filter(item => item.id !== this.id);
        this.taskList = this.taskList.filter(item => item.id !== this.id);
        this.refreshItems();
      }
    })
    .catch(error => {
      if(error.status == undefined){
        this.tasks = this.tasks.filter(item => item.id !== this.id);
        this.taskList = this.taskList.filter(item => item.id !== this.id);
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

    this.pageNumber = parseInt(""+ (this.tasks.length / this.pageSize));
    if(this.tasks.length % this.pageSize != 0){
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
      this.taskList = this.taskList.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
      this.pagesIndex =  this.fillArray();
      this.record = this.taskList.length;
      this.totalrecord = this.taskList.length;
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
}

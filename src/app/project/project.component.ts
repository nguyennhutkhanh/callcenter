import { Project } from './../shared/models/project';
import { ProjectService } from './../shared/services/project.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [ProjectService], 
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];

  //Pagination
  projectList: Project [];
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

  constructor(public router: Router, private projectService: ProjectService) { }

  ngOnInit() {
    this.onGetProjects();
  }

  private async onGetProjects(){
    this.projectService.getProjects()
    .then(result => {
      this.projects = result;
      this.projectList = this.projects;
      this.totalrecord = this.projectList.length;
      this.init();
    })
    .catch(error => {
      console.log(error);
    });
  }

  onCreateProject(){
    this.router.navigateByUrl("project/create-project");
  }

  onEditProject(id: string){
    this.router.navigate(["project/edit-project", id]);
  }

  onDetailProject(id: string){
    this.router.navigate(["project/detail-project", id]);
  }

  onSearchProject(){
    this.projectList = [];
    if(this.inputName != ""){
        this.projects.forEach(element => {
            if(element.name.toUpperCase().indexOf(this.inputName.toUpperCase())>=0){
              this.projectList.push(element);
            }
        });
    }else{
       this.projectList = this.projects;
    }
    this.init();
  }

  onShowDialogDeleteProject(id:string){
    this.id = id;
    this.openedDelete = true;
  }

  onCloseDialogDeleteProject(){
    this.openedDelete = false;
  }

  onDeleteProject(){
    this.onCloseDialogDeleteProject();
    this.projectService.deleteProject(this.id)
    .then(result => {
      if(result.status == 200){
        this.projects = this.projects.filter(item => item.id !== this.id);
        this.projectList = this.projectList.filter(item => item.id !== this.id);
        this.refreshItems();
      }
    })
    .catch(error => {
      if(error.status == undefined){
        this.projects = this.projects.filter(item => item.id !== this.id);
        this.projectList = this.projectList.filter(item => item.id !== this.id);
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

    this.pageNumber = parseInt(""+ (this.projects.length / this.pageSize));
    if(this.projects.length % this.pageSize != 0){
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
      this.projectList = this.projectList.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
      this.pagesIndex =  this.fillArray();
      this.record = this.projectList.length;
      this.totalrecord = this.projectList.length;
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

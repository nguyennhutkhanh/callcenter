import { ProjectUserJSon } from './../../shared/models/project-user';
import { CommonService } from 'app/shared/services/common.service';
import { PgService } from './../../shared/services/pg.service';
import { ProjectUserService } from './../../shared/services/project-user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router/src/router';

@Component({
  selector: 'app-create-project-user',
  templateUrl: './create-project-user.component.html',
  styleUrls: ['./create-project-user.component.scss'],
  providers: [PgService, CommonService, ProjectUserService]
})
export class CreateProjectUserComponent implements OnInit {
  form: FormGroup;
  projectId: FormControl;
  userId: FormControl;

  projectUser: ProjectUserJSon;

  public defaultItem: { text: string, value: number } = { text: "Select item...", value: null };

  public listItems: Array<{ text: string, value: number }> = [
      { text: "Small", value: 1 },
      { text: "Medium", value: 2 },
      { text: "Large", value: 3 }
  ];

  //Error
  errorDialog: boolean = false;
  contentError: string = "";

  constructor(private fb: FormBuilder, private router: Router, private common: CommonService, private projectUserService: ProjectUserService) { 
    this.projectUser = new ProjectUserJSon();
  }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.projectId = new FormControl('', Validators.required);
    this.userId = new FormControl('', Validators.required);
    
    this.form = this.fb.group({
      projectId: this.projectId,
      userId: this.userId,
    });
  }

  onSave(){
    this.projectUser.projectId = this.isNull(this.projectId.value);
    this.projectUser.userId = this.isNull(this.userId.value);

    this.projectUser.dateModified = new Date();
    this.projectUser.deleted = false;

    this.projectUserService.addProjectUser(this.projectUser)
    .then(result => {
      if(result.status == 200){
        this.onBack();
      }
    })
    .catch(error => {
      if(error.status == undefined){
        this.onBack();
      }else{
        this.errorDialog = true;
        this.contentError = error.status + " - " + error.statusText
      }
    });
  }

  onCloseErrorDialog(){
    this.errorDialog = false;
  }
  
  onBack(){
    this.router.navigateByUrl("project-user");
  }

  isNull(value){
    if(value == null)
      return '';
    return value;
  }

}

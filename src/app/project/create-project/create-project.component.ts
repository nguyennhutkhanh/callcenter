import { Router } from '@angular/router';
import { ProjectJSon } from './../../shared/models/project';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'app/shared/services/project.service';
import { CommonService } from 'app/shared/services/common.service';
import { PgService } from './../../shared/services/pg.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
  providers: [PgService, CommonService, ProjectService]
})
export class CreateProjectComponent implements OnInit {
  form: FormGroup;
  name: FormControl;
  dateSent: FormControl;
  messageId: FormControl;
  type: FormControl;
  status: FormControl;
  flagged: FormControl;
  replyToStatus: FormControl;
  intent: FormControl;
  mailboxId: FormControl;
  parentType: FormControl;
  parentId: FormControl;

  project: ProjectJSon;

  public defaultItem: { text: string, value: number } = { text: "Select item...", value: null };

  public listItems: Array<{ text: string, value: number }> = [
      { text: "Small", value: 1 },
      { text: "Medium", value: 2 },
      { text: "Large", value: 3 }
  ];

  //Error
  errorDialog: boolean = false;
  contentError: string = "";

  constructor(private fb: FormBuilder, private router: Router, private common: CommonService, private projectService: ProjectService) { 
    this.project = new ProjectJSon();
  }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.name = new FormControl('', Validators.required);
    this.dateSent = new FormControl('', Validators.required);
    this.messageId = new FormControl('', Validators.required);
    this.type = new FormControl('', Validators.required);
    this.status = new FormControl(null, Validators.required);
    this.flagged = new FormControl(null , Validators.required);
    this.replyToStatus = new FormControl(null , Validators.required);
    this.intent = new FormControl('');
    this.mailboxId = new FormControl('');
    this.parentType = new FormControl(null, Validators.required);
    this.parentId = new FormControl(null, Validators.required);

    this.form = this.fb.group({
      name: this.name,
      dateSent: this.dateSent,
      messageId: this.messageId,
      type: this.type,
      status: this.status,
      flagged: this.flagged,
      replyToStatus: this.replyToStatus,
      intent: this.intent,
      mailboxId: this.mailboxId,
      parentType: this.parentType,
      parentId: this.parentId,
    });
  }

  onSave(){
    this.project.name = this.isNull(this.name.value);
    this.project.dateSent = this.isNull(this.dateSent.value);
    this.project.messageId = this.isNull(this.messageId.value);
    this.project.type = this.isNull(this.type.value);
    this.project.status = this.isNull(this.status.value);
    this.project.flagged = this.isNull(this.flagged.value);
    this.project.replyToStatus = this.isNull(this.replyToStatus.value);
    this.project.intent = this.isNull(this.intent.value);
    this.project.mailboxId = this.isNull(this.mailboxId.value);
    this.project.parentType = this.isNull(this.parentType.value);
    this.project.parentId = this.isNull(this.parentId.value);

    this.project.createdBy = "12345"; //Replace this one
    this.project.assignedUserId = "12345"; //Replace this one
    this.project.dateEntered = new Date();
    this.project.dateModified = new Date();
    this.project.deleted = false;

    this.projectService.addProject(this.project)
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
    this.router.navigateByUrl("account");
  }

  isNull(value){
    if(value == null)
      return '';
    return value;
  }
}

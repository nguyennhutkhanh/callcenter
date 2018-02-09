import { Router } from '@angular/router';
import { TaskJson } from './../../shared/models/task';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PgService } from './../../shared/services/pg.service';
import { CommonService } from 'app/shared/services/common.service';
import { TaskService } from './../../shared/services/task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  providers: [PgService, CommonService, TaskService]
})
export class CreateTaskComponent implements OnInit {
  form: FormGroup;
  name: FormControl;
  description: FormControl;
  status: FormControl;
  dateDueFlag: FormControl;
  dateDue: FormControl;
  dateStartFlag: FormControl;
  dateStart: FormControl;
  parentType: FormControl;
  parentId: FormControl;
  contactId: FormControl;
  priority: FormControl;

  task: TaskJson;

  public defaultItem: { text: string, value: number } = { text: "Select item...", value: null };

  public listItems: Array<{ text: string, value: number }> = [
      { text: "Small", value: 1 },
      { text: "Medium", value: 2 },
      { text: "Large", value: 3 }
  ];

  //Error
  errorDialog: boolean = false;
  contentError: string = "";
  
  constructor(private fb: FormBuilder, private router: Router, private common: CommonService, private taskService: TaskService) { 
    this.task = new TaskJson();
  }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.name = new FormControl('', Validators.required);
    this.description = new FormControl('', Validators.required);
    this.status = new FormControl('', Validators.required);
    this.dateDueFlag = new FormControl('', Validators.required);
    this.dateDue = new FormControl(null, Validators.required);
    this.dateStartFlag = new FormControl(null , Validators.required);
    this.dateStart = new FormControl(null , Validators.required);
    this.parentType = new FormControl('');
    this.parentId = new FormControl('');
    this.contactId = new FormControl(null, Validators.required);
    this.priority = new FormControl(null, Validators.required);

    this.form = this.fb.group({
      name: this.name,
      description: this.description,
      status: this.status,
      dateDueFlag: this.dateDueFlag,
      dateDue: this.dateDue,
      dateStartFlag: this.dateStartFlag,
      dateStart: this.dateStart,
      parentType: this.parentType,
      parentId: this.parentId,
      contactId: this.contactId,
      priority: this.priority,
    });
  }

  onSave(){
    this.task.name = this.isNull(this.name.value);
    this.task.description = this.isNull(this.description.value);
    this.task.status = this.isNull(this.status.value);
    this.task.dateDueFlag = this.isNull(this.dateDueFlag.value);
    this.task.dateDue = this.isNull(this.dateDue.value);
    this.task.dateStartFlag = this.isNull(this.dateStartFlag.value);
    this.task.dateStart = this.isNull(this.dateStart.value);
    this.task.parentType = this.isNull(this.parentType.value);
    this.task.parentId = this.isNull(this.parentId.value);
    this.task.contactId = this.isNull(this.contactId.value);
    this.task.priority = this.isNull(this.priority.value);

    this.task.createdBy = "12345"; //Replace this one
    this.task.assignedUserId = "12345"; //Replace this one
    this.task.dateEntered = new Date();
    this.task.dateModified = new Date();
    this.task.deleted = false;

    this.taskService.addTask(this.task)
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

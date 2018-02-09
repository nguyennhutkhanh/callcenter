import { Validators } from '@angular/forms/src/validators';
import { ProjectContactJSon } from './../../shared/models/project-contact';
import { Router } from '@angular/router';
import { ProjectContactService } from 'app/shared/services/project-contact.service';
import { CommonService } from 'app/shared/services/common.service';
import { PgService } from './../../shared/services/pg.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-project-contact',
  templateUrl: './create-project-contact.component.html',
  styleUrls: ['./create-project-contact.component.scss'],
  providers: [PgService, CommonService, ProjectContactService]
})
export class CreateProjectContactComponent implements OnInit {
  form: FormGroup;
  projectId: FormControl;
  contactIid: FormControl;

  projectContact: ProjectContactJSon;

  public defaultItem: { text: string, value: number } = { text: "Select item...", value: null };

  public listItems: Array<{ text: string, value: number }> = [
      { text: "Small", value: 1 },
      { text: "Medium", value: 2 },
      { text: "Large", value: 3 }
  ];

  //Error
  errorDialog: boolean = false;
  contentError: string = "";
  constructor(private fb: FormBuilder, private router: Router, private common: CommonService, private projectContactService: ProjectContactService) { 
    this.projectContact = new ProjectContactJSon();
  }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.projectId = new FormControl('', Validators.required);
    this.contactIid = new FormControl('', Validators.required);
    
    this.form = this.fb.group({
      projectId: this.projectId,
      contactIid: this.contactIid,
    });
  }

  onSave(){
    this.projectContact.projectId = this.isNull(this.projectId.value);
    this.projectContact.contactIid = this.isNull(this.contactIid.value);

    this.projectContact.dateModified = new Date();
    this.projectContact.deleted = false;

    this.projectContactService.addProjectContact(this.projectContact)
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
    this.router.navigateByUrl("project-contact");
  }

  isNull(value){
    if(value == null)
      return '';
    return value;
  }
}

import { Router } from '@angular/router';
import { EmailJSon } from './../../shared/models/email';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { EmailService } from './../../shared/services/email.service';
import { CommonService } from 'app/shared/services/common.service';
import { PgService } from './../../shared/services/pg.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-email',
  templateUrl: './create-email.component.html',
  styleUrls: ['./create-email.component.scss'],
  providers: [PgService, CommonService, EmailService]
})
export class CreateEmailComponent implements OnInit {
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

  email: EmailJSon;

  public defaultItem: { text: string, value: number } = { text: "Select item...", value: null };

  public listItems: Array<{ text: string, value: number }> = [
      { text: "Small", value: 1 },
      { text: "Medium", value: 2 },
      { text: "Large", value: 3 }
  ];

  //Error
  errorDialog: boolean = false;
  contentError: string = "";
  
  constructor(private fb: FormBuilder, private router: Router, private common: CommonService, private emailService: EmailService) { 
    this.email = new EmailJSon();
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
    this.email.name = this.isNull(this.name.value);
    this.email.dateSent = this.isNull(this.dateSent.value);
    this.email.messageId = this.isNull(this.messageId.value);
    this.email.type = this.isNull(this.type.value);
    this.email.status = this.isNull(this.status.value);
    this.email.flagged = this.isNull(this.flagged.value);
    this.email.replyToStatus = this.isNull(this.replyToStatus.value);
    this.email.intent = this.isNull(this.intent.value);
    this.email.mailboxId = this.isNull(this.mailboxId.value);
    this.email.parentType = this.isNull(this.parentType.value);
    this.email.parentId = this.isNull(this.parentId.value);

    this.email.createdBy = "12345"; //Replace this one
    this.email.assignedUserId = "12345"; //Replace this one
    this.email.dateEntered = new Date();
    this.email.dateModified = new Date();
    this.email.deleted = false;

    this.emailService.addEmail(this.email)
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

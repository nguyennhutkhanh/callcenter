import { CallContactJSon } from 'app/shared/models/call-contact';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PgService } from 'app/shared/services/pg.service';
import { CommonService } from 'app/shared/services/common.service';
import { CallContactService } from './../../shared/services/call-contact.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-call-contact',
  templateUrl: './create-call-contact.component.html',
  styleUrls: ['./create-call-contact.component.scss'],
  providers: [PgService, CommonService, CallContactService]
})
export class CreateCallContactComponent implements OnInit {
  form: FormGroup;
  callId: FormControl;
  contactId: FormControl;
  required: FormControl;
  acceptStatus: FormControl;

  callContact: CallContactJSon;

  public defaultItem: { text: string, value: number } = { text: "Select item...", value: null };

  public listItems: Array<{ text: string, value: number }> = [
      { text: "Small", value: 1 },
      { text: "Medium", value: 2 },
      { text: "Large", value: 3 }
  ];

  //Error
  errorDialog: boolean = false;
  contentError: string = "";

  constructor(private fb: FormBuilder, private router: Router, private common: CommonService, private callContactService: CallContactService) { 
    this.callContact = new CallContactJSon();
  }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.callId = new FormControl('', Validators.required);
    this.contactId = new FormControl('', Validators.required);
    this.required = new FormControl('', Validators.required);
    this.acceptStatus = new FormControl('', Validators.required);
    
    this.form = this.fb.group({
      callId: this.callId,
      contactId: this.contactId,
      required: this.required,
      acceptStatus: this.acceptStatus,
    });
  }

  onSave(){
    this.callContact.callId = this.isNull(this.callId.value);
    this.callContact.contactId = this.isNull(this.contactId.value);
    this.callContact.required = this.isNull(this.required.value);
    this.callContact.acceptStatus = this.isNull(this.acceptStatus.value);

    this.callContact.dateModified = new Date();
    this.callContact.deleted = false;

    this.callContactService.addCallContact(this.callContact)
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
    this.router.navigateByUrl("call-contact");
  }

  isNull(value){
    if(value == null)
      return '';
    return value;
  }

}

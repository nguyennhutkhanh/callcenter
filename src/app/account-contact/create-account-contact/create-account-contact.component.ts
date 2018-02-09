import { Validators } from '@angular/forms/src/validators';
import { CommonService } from 'app/shared/services/common.service';
import { PgService } from 'app/shared/services/pg.service';
import { AccountContactJSon } from './../../shared/models/account-contact';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AccountContactService } from 'app/shared/services/account-contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account-contact',
  templateUrl: './create-account-contact.component.html',
  styleUrls: ['./create-account-contact.component.scss'],
  providers: [PgService, CommonService, AccountContactService]
})
export class CreateAccountContactComponent implements OnInit {
  form: FormGroup;
  contactId: FormControl;
  accountId: FormControl;

  acountContact: AccountContactJSon;

  public defaultItem: { text: string, value: number } = { text: "Select item...", value: null };

  public listItems: Array<{ text: string, value: number }> = [
      { text: "Small", value: 1 },
      { text: "Medium", value: 2 },
      { text: "Large", value: 3 }
  ];

  //Error
  errorDialog: boolean = false;
  contentError: string = "";

  constructor(private fb: FormBuilder, private router: Router, private common: CommonService, private accountContactService: AccountContactService) { 
    this.acountContact = new AccountContactJSon();
  }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.contactId = new FormControl('', Validators.required);
    this.accountId = new FormControl('', Validators.required);
    
    this.form = this.fb.group({
      contactId: this.contactId,
      accountId: this.accountId,
    });
  }

  onSave(){
    this.acountContact.contactId = this.isNull(this.contactId.value);
    this.acountContact.accountId = this.isNull(this.accountId.value);

    this.acountContact.dateModified = new Date();
    this.acountContact.deleted = false;

    this.accountContactService.addAccountContact(this.acountContact)
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
    this.router.navigateByUrl("account-contact");
  }

  isNull(value){
    if(value == null)
      return '';
    return value;
  }
}

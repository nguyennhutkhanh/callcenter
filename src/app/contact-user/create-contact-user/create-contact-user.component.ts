import { Validators } from '@angular/forms/src/validators';
import { ContactUserJSon } from './../../shared/models/contact-user';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CommonService } from 'app/shared/services/common.service';
import { Component, OnInit } from '@angular/core';
import { PgService } from 'app/shared/services/pg.service';
import { ContactUserService } from 'app/shared/services/contact-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-contact-user',
  templateUrl: './create-contact-user.component.html',
  styleUrls: ['./create-contact-user.component.scss'],
  providers: [PgService, CommonService, ContactUserService]
})
export class CreateContactUserComponent implements OnInit {
  form: FormGroup;
  contactId: FormControl;
  userId: FormControl;

  contactUser: ContactUserJSon;

  public defaultItem: { text: string, value: number } = { text: "Select item...", value: null };

  public listItems: Array<{ text: string, value: number }> = [
      { text: "Small", value: 1 },
      { text: "Medium", value: 2 },
      { text: "Large", value: 3 }
  ];

  //Error
  errorDialog: boolean = false;
  contentError: string = "";

  constructor(private fb: FormBuilder, private router: Router, private common: CommonService, private contactUserService: ContactUserService) { 
    this.contactUser = new ContactUserJSon();
  }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.contactId = new FormControl('', Validators.required);
    this.userId = new FormControl('', Validators.required);
    
    this.form = this.fb.group({
      contactId: this.contactId,
      userId: this.userId,
    });
  }

  onSave(){
    this.contactUser.contactId = this.isNull(this.contactId.value);
    this.contactUser.userId = this.isNull(this.userId.value);
   
    this.contactUser.dateModified = new Date();
    this.contactUser.deleted = false;

    this.contactUserService.addContactUser(this.contactUser)
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
    this.router.navigateByUrl("contact-user");
  }

  isNull(value){
    if(value == null)
      return '';
    return value;
  }
}

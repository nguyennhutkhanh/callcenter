import { Router } from '@angular/router';
import { CallUserJSon } from 'app/shared/models/call-user';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CallUserService } from './../../shared/services/call-user.service';
import { CommonService } from 'app/shared/services/common.service';
import { PgService } from './../../shared/services/pg.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-call-user',
  templateUrl: './create-call-user.component.html',
  styleUrls: ['./create-call-user.component.scss'],
  providers: [PgService, CommonService, CallUserService]
})
export class CreateCallUserComponent implements OnInit {
  form: FormGroup;
  callId: FormControl;
  userId: FormControl;
  required: FormControl;
  acceptStatus: FormControl;

  callUser: CallUserJSon;

  public defaultItem: { text: string, value: number } = { text: "Select item...", value: null };

  public listItems: Array<{ text: string, value: number }> = [
      { text: "Small", value: 1 },
      { text: "Medium", value: 2 },
      { text: "Large", value: 3 }
  ];

  //Error
  errorDialog: boolean = false;
  contentError: string = "";

  constructor(private fb: FormBuilder, private router: Router, private common: CommonService, private callUserService: CallUserService) { 
    this.callUser = new CallUserJSon();
  }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.callId = new FormControl('', Validators.required);
    this.userId = new FormControl('', Validators.required);
    this.required = new FormControl('', Validators.required);
    this.acceptStatus = new FormControl('', Validators.required);
    
    this.form = this.fb.group({
      callId: this.callId,
      userId: this.userId,
      required: this.userId,
      acceptStatus: this.userId,
    });
  }

  onSave(){
    this.callUser.callId = this.isNull(this.callId.value);
    this.callUser.userId = this.isNull(this.userId.value);
    this.callUser.required = this.isNull(this.required.value);
    this.callUser.acceptStatus = this.isNull(this.acceptStatus.value);

    this.callUser.dateModified = new Date();
    this.callUser.deleted = false;

    this.callUserService.addCallUser(this.callUser)
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
    this.router.navigateByUrl("call-user");
  }

  isNull(value){
    if(value == null)
      return '';
    return value;
  }
}

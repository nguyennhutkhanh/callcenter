import { User } from './../../shared/models/user';
import { Call } from './../../shared/models/call';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PgService } from './../../shared/services/pg.service';
import { CommonService } from 'app/shared/services/common.service';
import { CallService } from 'app/shared/services/call.service';
import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ContactService } from 'app/shared/services/contact.service';
import { AccountService } from 'app/shared/services/account.service';
import { Contact } from 'app/shared/models/contact';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentService } from 'app/shared/services/department.service';

@Component({
  selector: 'app-edit-call',
  templateUrl: './edit-call.component.html',
  styleUrls: ['./edit-call.component.scss'],
  providers: [PgService, CommonService, CallService, AccountService, UserService, ContactService, DepartmentService]
})
export class EditCallComponent implements OnInit {
  form: FormGroup;
  subject: FormControl;
  durationHours: FormControl;
  durationMinutes: FormControl;
  dateStart: FormControl;
  timeStart: FormControl;
  status: FormControl;
  direction: FormControl;
  parentId: FormControl;
  reminderTime: FormControl;
  relatedTo: FormControl;
  relatedToId: FormControl;
  description: FormControl;
  userId: FormControl;
  popup: FormControl;
  call: Call;
  public listDirection: Array<{ text: string, value: number }> = [
    { text: "Inbound", value: 1 },
    { text: "Outbound", value: 2 },
  ];
  public selectedDirection: { text: string, value: number } = this.listDirection[0];

  public listStatus: Array<{ text: string, value: number }> = [
    { text: "Planned", value: 1 },
    { text: "Held", value: 2 },
    { text: "Not Held", value: 2 },
  ];
  public selectedStatus: { text: string, value: number } = this.listStatus[0];

  public listRelated: Array<{ text: string, value: number }> = [
  { text: "Account", value: 1 },
  { text: "Contact", value: 2 },
  { text: "Case", value: 3 },
  { text: "Product", value: 4 },
  ];
  public selectedRelated: { text: string, value: number } = this.listRelated[0];

  public listDurationMinute: Array<{ text: string, value: number }> = [
  { text: "00", value: 0 },
  { text: "15", value: 15 },
  { text: "30", value: 30 },
  { text: "45", value: 45 },
  ];
  public selectedDurationMinute: { text: string, value: number } = this.listDurationMinute[0];

  public listReminder: Array<{ text: string, value: number }> = [
  { text: "00", value: 0 },
  { text: "15", value: 15 },
  { text: "30", value: 30 },
  { text: "45", value: 45 },
  ];
  public selectedReminder: { text: string, value: number } = this.listReminder[0];

  //Error
  errorDialog: boolean = false;
  contentError: string = "";

  accountDialog: boolean = false;
  contactDialog: boolean = false;
  usersDialog: boolean = false;
  //Account
  accounts: Account[] = [];

  //Pagination
  accountList: Account [];

  //search
  inputName : string = '';

  accountId: string = '';


  //Contact
  contacts: Contact[] = [];

  //Pagination
  contactList: Contact [];

  //search
  inputNameContact : string = '';
  users: User[] = [];
  id: string;

  //User
  userList: User[] = [];
  popUpCheck: boolean =  false;

  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private commonService: CommonService, private callService: CallService, private accountService: AccountService, private userService: UserService, private contactService: ContactService) { 
    this.call = new Call();
    this.onGetAccounts();
    this.onGetContacts();
    
  }

  async ngOnInit() {
    this.createForm();
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'] || '';
        this.onGetCall(this.id);
   });
  }

  private async onGetCall(id){
    await this.callService.getCall(id)
    .then(result => {
      this.call = result;
      this.createForm();
      console.log(this.call);
    })
    .catch(error => {
      console.log(error);
    });
  }

  private createForm() {
    if(this.call.id != undefined){
      this.selectedReminder = this.listReminder.filter(m => m.value == this.call.reminderTime)[0];
      this.selectedDirection = this.listDirection.filter(m => m.text.toLowerCase() == this.call.direction.toLowerCase())[0];
      this.selectedStatus = this.listStatus.filter(m => m.text.toLowerCase() == this.call.status.toLowerCase())[0];
      this.selectedDurationMinute = this.listDurationMinute.filter(m => m.value == this.call.durationMinutes)[0];
      this.selectedRelated = this.listRelated.filter(m => m.text.toLowerCase() == this.call.relatedTo.toLowerCase())[0];
    }

    this.subject = new FormControl(this.call.subject, Validators.required);
    this.durationHours = new FormControl(this.call.durationHours, Validators.required);
    this.durationMinutes = new FormControl(this.selectedDurationMinute, Validators.required);
    this.dateStart = new FormControl(new Date(this.call.dateStart), Validators.required);
    this.timeStart = new FormControl(new Date(this.call.dateStart), Validators.required);
    this.status = new FormControl(this.selectedStatus);
    this.direction = new FormControl(this.selectedDirection);
    this.reminderTime = new FormControl(this.selectedReminder);
    this.relatedTo = new FormControl(this.selectedRelated);
    this.relatedToId = new FormControl('');    
    this.description = new FormControl(this.call.description, Validators.required);

    if(this.call.reminderTime > 0)
      this.popUpCheck = true;
    this.userId = new FormControl('');
    this.popup = new FormControl(this.popUpCheck);

    this.form = this.fb.group({
      subject: this.subject,
      dateStart: this.dateStart,
      timeStart: this.timeStart,
      status: this.status,
      direction: this.direction,
      durationHours: this.durationHours,
      durationMinutes: this.durationMinutes,
      reminderTime: this.reminderTime,
      relatedTo: this.relatedTo,
      relatedToId: this.relatedToId,
      description: this.description,
      userId: this.userId,
      popup: this.popup
    });

    if(this.call.id != undefined){
      this.getRelatedTo(this.call.relatedTo, this.call.relatedToId);
      this.userIdDialog = this.call.userId;
      this.userNameModel = this.call.userFullName;
    }
  }

  onSave(){
    var callUpdate = new Call();
    callUpdate.id = this.call.id;
    callUpdate.subject = this.isNull(this.subject.value);
    callUpdate.direction = this.isNull(this.selectedDirection.text);
    callUpdate.status = this.isNull(this.status.value.text);
    callUpdate.dateStart = this.commonService.ConvertDateTimeToInt(new Date(this.commonService.convertStringToDate(this.isNull(this.dateStart.value)) + ' ' + this.commonService.convertStringToTime(this.isNull(this.timeStart.value))));
    callUpdate.relatedTo = this.isNull(this.relatedTo.value.text);
    if(this.relatedTo.value.value == 1)
      callUpdate.relatedToId = this.accountId;
    else
      callUpdate.relatedToId = this.contactId;
    callUpdate.durationHours = this.isNull(this.durationHours.value);
    callUpdate.durationMinutes = this.isNull(this.durationMinutes.value.value);
    
    if(this.popUpCheck == false){
      callUpdate.reminderTime = 0;
    }else{
      callUpdate.reminderTime = this.isNull(this.reminderTime.value.value);
    }
    
    callUpdate.description = this.isNull(this.description.value);
    callUpdate.userId = this.isNull(this.userIdDialog);

    this.callService.updateCall(callUpdate)
    .then(result => {
        this.onBack();
    })
    .catch(error => {
        this.errorDialog = true;
        this.contentError = error.status + " - " + error.statusText
    });
  }

  onSelect(){
    if(this.selectedRelated.value == 1){
      this.accountDialog = true;
      this.onGetAccounts();
    }else{
       if(this.selectedRelated.value == 2){
         this.contactDialog = true;
         this.onGetContacts();
       }else{
       }
    }
  }

  onCloseErrorDialog(){
    this.errorDialog = false;
  }

  onCloseAccountDialog(){
    this.accountDialog = false;
  }

  onBack(){
    this.router.navigateByUrl("call");
  }

  isNull(value){
    if(value == null)
      return '';
    return value;
  }

  private async onGetAccounts(){
    await this.accountService.getAccounts()
    .then(result => {
      this.accounts = result;
      this.accountList = this.accounts;
      
      this.onGetContacts();
    })
    .catch(error => {
      console.log(error);
    });
  }

  private async onGetUser(id: string){
    await this.userService.getUser(id)
    .then(result => {
      result.name;
    })
    .catch(error => {
      return '';
    });
  }

  onSearchAccount(){
    this.accountList = [];
    if(this.inputName != ""){
        this.accounts.forEach(element => {
            if(element.name.toUpperCase().indexOf(this.inputName.toUpperCase())>=0){
              this.accountList.push(element);
            }
        });
    }else{
      this.accountList = this.accounts;
    }
  }

  onCloseCallDialog(){
    this.accountDialog = false;
  }

  relatedToIdModel: string = '';
  onAccountSelect(item){
    this.accountId = item.id;
    this.accountDialog = false;

    this.relatedToIdModel = item.name;

     //Delete contact
     this.contactId = '';
  }

  ConvertIntToDateTime(value: number) {
    var month = new Date(value).getMonth() + 1;
    var day = new Date(value).getDate();
    return new Date(value).getFullYear() + "-" + (month <= 9 ? "0" + month : month) + "-" + (day <= 9 ? "0" + day : day);
  }

  //Contact dialog
  private async onGetUsers(){
    await this.userService.getUsers()
    .then(result => {
      this.users = result;
      this.userList = result;
      
    })
    .catch(error => {
    });
  }

  onGetUserByUserID(id: string){
    if(id != null && id != '')
      return this.users.find(item => item.id == id).firstName + ' ' + this.users.find(item => item.id == id).lastName;
    return '';
  }

  private async onGetContacts(){
    await this.contactService.getContacts()
    .then(result => {
      this.contacts = result;
      this.contactList = this.contacts;
    })
    .catch(error => {
      console.log(error);
    });
  }

  onSearchContact(){
    this.contactList = [];
    if(this.inputName != ""){
        this.contacts.forEach(element => {
            if(element.firstName.toUpperCase().indexOf(this.inputName.toUpperCase())>=0 || element.lastName.toUpperCase().indexOf(this.inputName.toUpperCase())>=0){
              this.contactList.push(element);
            }
        });
    }else{
      this.contactList = this.contacts;
    }
  }

  onCloseContactDialog(){
    this.contactDialog = false;
  }

  contactId: string = '';
  onContactSelect(item){
    this.contactId = item.id;
    this.contactDialog = false;

    this.relatedToIdModel = item.firstName + ' ' + item.lastName;
    //Delete account
    this.accountId = '';
  }

  onSelectUser(){
    this.usersDialog = true;
    this.onGetUsers();
  }

  onCloseUserDialog(){
    this.usersDialog = false;
  }

  userIdDialog: string = '';
  userNameModel: string = '';
  onUserSelect(item){
    this.userIdDialog = item.id;
    this.userNameModel = item.firstName + ' ' + item.lastName;
    this.usersDialog = false;
  }


  getRelatedTo(value, id){
    if(value == "Account"){
      var ac = this.accounts.filter(m => m.id == id)[0];
      if(ac != undefined)
        this.relatedToIdModel = ac.name;
    }else{
      var ct = this.contacts.filter(m => m.id == id)[0];
      if(ct != undefined)
        this.relatedToIdModel = ct.firstName + ' ' + ct.lastName;
    }
  }

  getUser(id){
    var us = this.users.filter(m => m.id == id)[0];
    if(us != undefined){
      this.userIdDialog = us.id;
      this.userNameModel = us.firstName + ' ' + us.lastName;
    }
    
  }
}

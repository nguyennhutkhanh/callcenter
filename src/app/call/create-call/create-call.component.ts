import { Contact } from './../../shared/models/contact';
import { UserService } from './../../shared/services/user.service';
import { AccountService } from './../../shared/services/account.service';
import { Router } from '@angular/router';
import { EmailJSon } from './../../shared/models/email';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { PgService } from 'app/shared/services/pg.service';
import { CommonService } from 'app/shared/services/common.service';
import { CallService } from './../../shared/services/call.service';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Call } from 'app/shared/models/call';
import { ContactService } from 'app/shared/services/contact.service';
import { User } from 'app/shared/models/user';
import { DepartmentService } from 'app/shared/services/department.service';

@Component({
  selector: 'app-create-call',
  templateUrl: './create-call.component.html',
  styleUrls: ['./create-call.component.scss'],
  providers: [PgService, CommonService, CallService, AccountService, UserService, ContactService, DepartmentService]
})

export class CreateCallComponent implements OnInit {
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
  popup: FormControl;
  userId: FormControl;
  call: Call;

  public listDirection: Array<{ text: string, value: number }> = [
      { text: "Inbound", value: 1 },
      { text: "Outbound", value: 2 },
  ];
  public selectedDirection: { text: string, value: number } = this.listDirection[0];

  public listStatus: Array<{ text: string, value: number }> = [
    { text: "Planned", value: 1 },
    { text: "Held", value: 2 },
    { text: "Not Held", value: 3 },
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

   //User
   userList: User[] = [];
   popUpCheck: boolean =  false;
  constructor(private fb: FormBuilder, private router: Router, private commonService: CommonService, private callService: CallService, private accountService: AccountService, private userService: UserService, private contactService: ContactService) { 
    this.call = new Call();
    this.onGetUsers();
  }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.subject = new FormControl('', Validators.required);
    this.durationHours = new FormControl('0', Validators.required);
    this.durationMinutes = new FormControl( this.listDurationMinute[0], Validators.required);
    this.dateStart = new FormControl('', Validators.required);
    this.timeStart = new FormControl(null, Validators.required);
    this.status = new FormControl(this.listStatus[0]);
    this.direction = new FormControl(this.listDirection[0]);
    this.parentId = new FormControl('');
    this.reminderTime = new FormControl(null, Validators.required);
    this.relatedTo = new FormControl(this.listRelated[0]);
    this.relatedToId = new FormControl('');
    this.description = new FormControl('', Validators.required);
    this.userId = new FormControl('', );
    this.popup = new FormControl(false);


    this.form = this.fb.group({
      subject: this.subject,
      dateStart: this.dateStart,
      timeStart: this.timeStart,
      status: this.status,
      direction: this.direction,
      parentId: this.parentId,
      durationHours: this.durationHours,
      durationMinutes: this.durationMinutes,
      reminderTime: this.reminderTime,
      relatedTo: this.relatedTo,
      relatedToId: this.relatedToId,
      description: this.description,
      userId: this.userId,
      popup: this.popup
      
    });
  }

  onSave(){
    this.call.subject = this.isNull(this.subject.value);
    this.call.direction = this.isNull(this.direction.value.text);
    this.call.status = this.isNull(this.status.value.text);
    this.call.dateStart = this.commonService.ConvertDateTimeToInt(new Date(this.commonService.convertStringToDate(this.isNull(this.dateStart.value)) + ' ' + this.commonService.convertStringToTime(this.isNull(this.timeStart.value))));
    this.call.relatedTo = this.isNull(this.relatedTo.value.text);
    if(this.relatedTo.value.value == 1)
      this.call.relatedToId = this.accountId;
    else
      this.call.relatedToId = this.contactId;
    this.call.durationHours = this.isNull(this.durationHours.value);
    this.call.durationMinutes = this.isNull(this.durationMinutes.value.value);
    
    if(this.popUpCheck == false){
      this.call.reminderTime = 0;
    }else{
      this.call.reminderTime = this.isNull(this.reminderTime.value.value);
    }
    this.call.description = this.isNull(this.description.value);
    this.call.userId = this.isNull(this.userIdDialog);

    this.callService.addCall(this.call)
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
    this.accountService.getAccounts()
    .then(result => {
      this.accounts = result;
      this.accountList = this.accounts;
      
    })
    .catch(error => {
      console.log(error);
    });
  }

  private async onGetUser(id: string){
    this.userService.getUser(id)
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
  }

  ConvertIntToDateTime(value: number) {
    var month = new Date(value).getMonth() + 1;
    var day = new Date(value).getDate();
    return new Date(value).getFullYear() + "-" + (month <= 9 ? "0" + month : month) + "-" + (day <= 9 ? "0" + day : day);
  }

  //Contact dialog
  private async onGetUsers(){
    this.userService.getUsers()
    .then(result => {
      this.users = result;
      this.userList = result;
    })
    .catch(error => {
      
    });
  }

  onGetUserByUserID(id: string){
    console.log("User: " + id);
    console.log("Users:");
    console.log(this.users);
    if(id != null && id != '')
      return this.users.find(item => item.id == id).firstName + ' ' + this.users.find(item => item.id == id).lastName;
    return '';
  }

  private async onGetContacts(){
    this.contactService.getContacts()
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

    this.relatedToIdModel = item.firstName + ' ' + item.lastName;;
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
    console.log(item);
    this.userIdDialog = item.id;
    this.userNameModel = item.firstName + ' ' + item.lastName;
    this.usersDialog = false;
  }
}

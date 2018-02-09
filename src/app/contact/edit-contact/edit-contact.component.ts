import { DepartmentService } from './../../shared/services/department.service';
import { Department } from './../../shared/models/department';
import { User } from 'app/shared/models/user';
import { UserService } from 'app/shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from './../../shared/models/contact';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PgService } from './../../shared/services/pg.service';
import { CommonService } from './../../shared/services/common.service';
import { Component, OnInit } from '@angular/core';
import { ContactService } from 'app/shared/services/contact.service';
import { AccountService } from 'app/shared/services/account.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss'],
  providers: [PgService, CommonService, ContactService, AccountService, UserService, DepartmentService]
})
export class EditContactComponent implements OnInit {
  form: FormGroup;
  salutation: FormControl;
  firstName: FormControl;
  lastName: FormControl;
  title: FormControl;
  birthday: FormControl;
  department: FormControl;
  phoneWork: FormControl;
  phoneMobile: FormControl;
  phoneFax: FormControl;
  primaryAddressCountry: FormControl;
  primaryAddressCity: FormControl;
  primaryAddressState: FormControl;
  primaryAddressStreet: FormControl;
  primaryAddressPostCode: FormControl;
  altAddressCountry: FormControl;
  altAddressCity: FormControl;
  altAddressState: FormControl;
  altAddressStreet: FormControl;
  altAddressPostCode: FormControl;
  description: FormControl;
  assignedUserId: FormControl;
  contact: Contact;
  accountIdC: FormControl;

   //Error
   errorDialog: boolean = false;
   contentError: string = "";

  public selectedSalutation: Array<{ text: string, value: string }> = [
    { text: "Mr.", value: "Mr." },
    { text: "Mrs.", value: "Mrs." },
    { text: "Ms.", value: "Ms." },
    { text: "Dr.", value: "Mr." },
    { text: "Prof.", value: "Prof." },
  ];
  public selectedItemSalutation: { text: string, value: string } = this.selectedSalutation[0];

  accountDialog: boolean = false;
  userDialog: boolean = false;

  //Account
  accounts: Account[] = [];

  //Pagination
  accountList: Account [];
  
  //search
  inputName : string = '';

  accountId: string = '';

  //User
  users: User[] = [];

  //Pagination
  userList: User [];
  
  //search
  inputNameUser : string = '';
  userAssignName: string = "";

  id: string = "";
  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private commonService: CommonService, private contactService: ContactService, private accountService: AccountService, private userService: UserService) { 
    this.contact = new Contact();
  }

  ngOnInit() {
    this.createForm();
    this.activatedRoute.params.subscribe(params => {
      this.id =  params['id'] || '';

      this.onGetAccounts();
   });
  }

  private async onGetContact(id: string){
    this.contactService.getContact(id)
    .then(result => {
      this.contact = result;
      this.createForm();

      console.log("User assign: " + result.createdBy) 
      if(this.isNull(result.createdBy) != "")
        this.onGetUserAssigned(result.createdBy);
    })
    .catch(error => {
    });
  }

  private async onGetUserAssigned(id: string){
    this.userService.getUser(id)
    .then(result => {
      this.userId = result.id;
      this.userAssignName = result.firstName + ' ' + result.lastName;
    })
    .catch(error => {
    });
  }

  private createForm() {
    this.salutation = new FormControl(this.selectedSalutation.filter(res => res.value == this.contact.salutation)[0], Validators.required);
    this.firstName = new FormControl(this.contact.firstName, Validators.required);
    this.lastName = new FormControl(this.contact.lastName, Validators.required);
    this.title = new FormControl(this.contact.title);
    this.birthday = new FormControl(new Date(this.contact.birthdate));
    this.department = new FormControl(this.contact.department);
    this.phoneWork = new FormControl(this.contact.phoneWork);
    this.phoneMobile = new FormControl(this.contact.phoneMobile , Validators.required);
    this.phoneFax = new FormControl(this.contact.phoneFax);
    this.primaryAddressCountry = new FormControl(this.contact.primaryAddressCountry);
    this.primaryAddressCity = new FormControl(this.contact.primaryAddressCity);
    this.primaryAddressState = new FormControl(this.contact.primaryAddressState);
    this.primaryAddressStreet = new FormControl(this.contact.primaryAddressStreet);
    this.primaryAddressPostCode = new FormControl(this.contact.primaryAddressPostalcode);
    this.altAddressCountry = new FormControl(this.contact.altAddressCountry);
    this.altAddressCity = new FormControl(this.contact.altAddressCity);
    this.altAddressState = new FormControl(this.contact.altAddressState);
    this.altAddressStreet = new FormControl(this.contact.altAddressStreet);
    this.altAddressPostCode = new FormControl(this.contact.altAddressPostalcode);
    this.description = new FormControl(this.contact.description);
    this.assignedUserId = new FormControl(this.contact.assignedUserId);
    this.accountIdC = new FormControl('');

    this.form = this.fb.group({
      salutation: this.salutation,
      firstName: this.firstName,
      lastName: this.lastName,
      title: this.title,
      birthday: this.birthday,
      department: this.department,
      phoneWork: this.phoneWork,
      phoneMobile: this.phoneMobile,
      phoneFax: this.phoneFax,
      primaryAddressCountry: this.primaryAddressCountry,
      primaryAddressCity: this.primaryAddressCity,
      primaryAddressState: this.primaryAddressState,
      primaryAddressStreet: this.primaryAddressStreet,
      primaryAddressPostCode: this.primaryAddressPostCode,
      altAddressCountry: this.altAddressCountry,
      altAddressCity: this.altAddressCity,
      altAddressState: this.altAddressState,
      altAddressStreet: this.altAddressStreet,
      altAddressPostCode: this.altAddressPostCode,
      description: this.description,
      assignedUserId: this.assignedUserId,
      accountId: this.accountIdC
    });

    if(this.contact.id != undefined){
      this.accountId = this.contact.accountId;
      this.accountNameModel = this.contact.accountName;

      this.userId = this.contact.assignedUserId;
      this.userAssignName = this.contact.assignedUserName;
    }
  }

  onSave(){
    this.contact.firstName = this.isNull(this.firstName.value);
    this.contact.lastName = this.isNull(this.lastName.value);
    this.contact.title = this.isNull(this.title.value);
    this.contact.birthdate = this.commonService.ConvertDateTimeToInt(this.isNull(this.birthday.value));
    this.contact.department = this.isNull(this.department.value);
    this.contact.phoneWork = this.isNull(this.phoneWork.value);
    this.contact.phoneMobile = this.isNull(this.phoneMobile.value);
    this.contact.phoneFax = this.isNull(this.phoneFax.value);
    this.contact.primaryAddressCountry = this.isNull(this.primaryAddressCountry.value);
    this.contact.primaryAddressCity = this.isNull(this.primaryAddressCity.value);
    this.contact.primaryAddressState = this.isNull(this.primaryAddressState.value);
    this.contact.primaryAddressStreet = this.isNull(this.primaryAddressStreet.value);
    this.contact.altAddressCountry = this.isNull(this.altAddressCountry.value);
    this.contact.altAddressCity = this.isNull(this.altAddressCity.value);
    this.contact.altAddressState = this.isNull(this.altAddressState.value);
    this.contact.altAddressStreet = this.isNull(this.altAddressStreet.value);
    this.contact.description = this.isNull(this.description.value);

    this.contact.modifiedUserId = this.commonService.getUserId();
    this.contact.assignedUserId = this.userId //Replace this one
    this.contact.dateModified = this.commonService.ConvertDateTimeToInt(new Date());
    this.contact.accountId = this.accountId;

    this.contactService.updateContact(this.contact)
    .then(result => {
        this.onBack();
    })
    .catch(error => {
        this.errorDialog = true;
        this.contentError = error.status + " - " + error.statusText
    });
  }

  onCloseErrorDialog(){
    this.errorDialog = false;
  }

  onBack(){
    this.router.navigateByUrl("contact");
  }

  isNull(value){
    if(value == null)
      return '';
    return value;
  }

  onSelectAccount(){
    this.accountDialog = true;
    this.onGetAccounts();
}

  onCloseAccountDialog(){
    this.accountDialog = false;
  }
  private async onGetAccounts(){
    this.accountService.getAccounts()
    .then(result => {
      this.accounts = result;
      this.accountList = this.accounts;
      console.log(result);
      this.onGetContact(this.id);
    })
    .catch(error => {
      console.log(error);
    });
  }

  private async onGetUser(id: string){
    var us = this.users.filter(m => m.id == id)[0];
      if(us != undefined){
        this.userId = us.id;
        this.userAssignName = us.firstName + ' ' + us.lastName;
      }
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

  ConvertIntToDateTime(value: number) {
    var month = new Date(value).getMonth() + 1;
    var day = new Date(value).getDate();
    return new Date(value).getFullYear() + "-" + (month <= 9 ? "0" + month : month) + "-" + (day <= 9 ? "0" + day : day);
  }
  accountNameModel: string = '';
  onAccountSelect(item){
    this.accountId = item.id;
      this.accountNameModel = item.name;
      this.accountDialog = false;
  }


  //user Dialog
  onSelectUser(){
    this.userDialog = true;
      this.onGetUsers();
  }

  onClearUser(){
    this.userId = '';
    this.userAssignName = '';
  }

  userId: string="";
  onUserSelect(item){
    this.userId = item.id;
    this.userAssignName = item.firstName + ' ' + item.lastName;
    this.userDialog = false;
  }

  onCloseUserDialog(){
    this.userDialog = false;
  }

  private async onGetUsers(){
    this.userService.getUsers()
    .then(result => {
      this.users = result;
      this.userList = this.users;
    })
    .catch(error => {
      console.log(error);
    });
  }

  getAccount(id: string){
    var ac = this.accounts.filter(m => m.id == id)[0];
      if(ac != undefined){
        this.accountId = ac.id;
        this.accountNameModel = ac.name;
      }
  }

  onClearAccount(){
    this.accountId = '';
    this.accountNameModel = '';
  }
}

import { DepartmentService } from './../../shared/services/department.service';
import { Department } from './../../shared/models/department';
import { User } from 'app/shared/models/user';
import { UserService } from 'app/shared/services/user.service';
import { AccountService } from 'app/shared/services/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from './../../shared/models/contact';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PgService } from './../../shared/services/pg.service';
import { CommonService } from './../../shared/services/common.service';
import { Component, OnInit } from '@angular/core';
import { ContactService } from 'app/shared/services/contact.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss'],
  providers: [PgService, CommonService, ContactService, AccountService, UserService, DepartmentService]
})
export class CreateContactComponent implements OnInit {
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
  accountIdC: FormControl;
  contact: Contact;

   //Error
   errorDialog: boolean = false;
   contentError: string = "";
   errorCode: string = "";

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

  phone: string = '';
  constructor(private fb: FormBuilder, private router: Router, private activatedRoute:ActivatedRoute, private commonService: CommonService, private contactService: ContactService, private accountService: AccountService, private userService: UserService) { 
    this.contact = new Contact();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.phone =  params['phone'];
    });

    this.createForm();

  }

  private createForm() {
    this.salutation = new FormControl(this.selectedSalutation[0], Validators.required);
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.title = new FormControl('');
    this.birthday = new FormControl('');
    this.department = new FormControl('');
    this.phoneWork = new FormControl('');
    this.phoneMobile = new FormControl(this.phone, Validators.required);
    this.phoneFax = new FormControl('');
    this.primaryAddressCountry = new FormControl('');
    this.primaryAddressCity = new FormControl('');
    this.primaryAddressState = new FormControl('');
    this.primaryAddressStreet = new FormControl('');
    this.altAddressCountry = new FormControl('');
    this.primaryAddressPostCode = new FormControl('');
    this.altAddressCity = new FormControl('');
    this.altAddressState = new FormControl('');
    this.altAddressStreet = new FormControl('');
    this.altAddressPostCode = new FormControl('');
    this.description = new FormControl('');
    this.assignedUserId = new FormControl('');
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
  }

  onSave(){
    this.contact.salutation = this.isNull(this.salutation.value.value);
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
    this.contact.primaryAddressPostalcode = this.isNull(this.primaryAddressPostCode.value);
    this.contact.altAddressCountry = this.isNull(this.altAddressCountry.value);
    this.contact.altAddressCity = this.isNull(this.altAddressCity.value);
    this.contact.altAddressState = this.isNull(this.altAddressState.value);
    this.contact.altAddressStreet = this.isNull(this.altAddressStreet.value);
    this.contact.altAddressPostalcode = this.isNull(this.altAddressPostCode.value);
    this.contact.description = this.isNull(this.description.value);

    this.contact.createdBy =this.commonService.getUserId()
    this.contact.assignedUserId = this.userId;
    this.contact.dateEntered = this.commonService.ConvertDateTimeToInt(new Date());
    this.contact.deleted = 0;
    this.contact.accountId = this.accountId;

    this.contactService.addContact(this.contact)
    .then(result => {
        this.onBack();
    })
    .catch(error => {
        this.errorCode =  error.status + " - " + error.statusText;
        this.contentError = JSON.parse(error._body).error;
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

  onClearAccount(){
    this.accountId = '';
    this.accountNameModel = '';
  }
}

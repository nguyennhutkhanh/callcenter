import { AccountService } from 'app/shared/services/account.service';
import { ContactService } from './../../shared/services/contact.service';
import { DepartmentService } from './../../shared/services/department.service';
import { forEach } from '@angular/router/src/utils/collection';
import { RoleService } from './../../shared/services/role.service';
import { UserService } from './../../shared/services/user.service';
import { Router } from '@angular/router';
import { Email } from './../../shared/models/email';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PgService } from 'app/shared/services/pg.service';
import { CommonService } from 'app/shared/services/common.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'app/shared/models/user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  providers: [PgService, CommonService, UserService, RoleService, DepartmentService, ContactService, AccountService]
})
export class CreateUserComponent implements OnInit {
  form: FormGroup;
  username: FormControl;
  password: FormControl;
  firstName: FormControl;
  lastName: FormControl;
  isAdmin: FormControl;
  showOnEmployees: FormControl;
  title: FormControl;
  phoneWork: FormControl;
  phoneMobile: FormControl;
  phoneOther: FormControl;
  phoneFax: FormControl;
  addressCountry: FormControl;
  addressCity: FormControl;
  addressState: FormControl;
  addressStreet: FormControl;
  postalCode: FormControl;
  description: FormControl;
  emailAddress: FormControl;
  status: FormControl;
  employeeStatus: FormControl;
  aclRolesId: FormControl; 
  user: User;

  public listItemsStatus: Array<{ text: string, value: string }> = [
    { text: "Active", value: "Active" },
    { text: "Inactive", value: "Inactive" }
  ];
  public defaultItemStatus: { text: string, value: string } = this.listItemsStatus[0];
  
  public listItemsEmployeeStatus: Array<{ text: string, value: string }> = [
    { text: "Active", value: "Active" },
      { text: "Inactive", value: "Inactive" },
  ];
  public selectedItemEmployeeStatus: { text: string, value: string } = this.listItemsEmployeeStatus[0];
  
  public listItemsUserType: Array<{ text: string, value: boolean }> = [
    { text: "System administrator", value: true },
    { text: "User", value: false },
  ];
  public defaultItemUserType: { text: string, value: boolean } = this.listItemsUserType[0];

  public listItemsaclRolesId: Array<{ text: string, value: string }> = [
  ];
  public defaultItemaclRolesId: { text: string, value: string };

  //Error
  errorDialog: boolean = false;
  contentError: string = "";
  errorCode: string = "";
  constructor(private fb: FormBuilder, private router: Router, private commonService: CommonService, private userService: UserService, private roleService: RoleService) { 
    this.user = new User();
  }

  ngOnInit() {
    this.createForm(this.user);
    this.getRoles();
  }

  getRoles(){
    this.roleService.getRoles()
    .then(result => {
      result.forEach(element => {
        this.listItemsaclRolesId.push({text: element.name, value: element.id})
      });

      this.defaultItemaclRolesId =  this.listItemsaclRolesId[0];
    })
    .catch(error => {
      console.log(error);
    })
  }

  private createForm(data: User) {
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.isAdmin = new FormControl(null);
    this.showOnEmployees = new FormControl(true);
    this.title = new FormControl('');
    this.phoneWork = new FormControl('');
    this.phoneMobile = new FormControl('', Validators.required);
    this.phoneOther = new FormControl('');
    this.phoneFax = new FormControl('');
    this.addressCountry = new FormControl('');
    this.addressCity = new FormControl('');
    this.addressState = new FormControl('');
    this.addressStreet = new FormControl('');
    this.postalCode = new FormControl('');
    this.description = new FormControl('');
    this.emailAddress = new FormControl('');
    this.status = new FormControl(null);
    this.employeeStatus = new FormControl(null);
    this.aclRolesId = new FormControl(null);

    this.form = this.fb.group({
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      isAdmin: this.isAdmin,
      showOnEmployees: this.showOnEmployees,
      title: this.title,
      phoneWork: this.phoneWork,
      phoneMobile: this.phoneMobile,
      phoneOther: this.phoneOther,
      phoneFax: this.phoneFax,
      addressCountry: this.addressCountry,
      addressCity: this.addressCity,
      addressState: this.addressState,
      addressStreet: this.addressStreet,
      postalCode: this.postalCode,
      description: this.description,
      emailAddress: this.emailAddress,
      status : this.status,  
      employeeStatus : this.employeeStatus,
      aclRolesId: this.aclRolesId     
    });
  }

  onSave(password){
    this.user.userName = this.isNull(this.username.value);
    this.user.userHash = password;
    this.user.firstName = this.isNull(this.firstName.value);
    this.user.lastName = this.isNull(this.lastName.value);
    this.user.isAdmin = this.isAdmin.value == null ? 1 :  this.isAdmin.value.value == true ? 1 : 0;
    this.user.showOnEmployees = 1;
    this.user.title = this.isNull(this.title.value);
    this.user.phoneWork = this.isNull(this.phoneWork.value);
    this.user.phoneMobile = this.isNull(this.phoneMobile.value);
    this.user.phoneOther = this.isNull(this.phoneOther.value);
    this.user.phoneFax = this.isNull(this.phoneFax.value);
    this.user.addressCountry = this.isNull(this.addressCountry.value);
    this.user.addressCity = this.isNull(this.addressCity.value);
    this.user.addressState = this.isNull(this.addressState.value);
    this.user.addressStreet = this.isNull(this.addressStreet.value);
    this.user.addressPostalcode = this.isNull(this.postalCode.value);
    this.user.description = this.isNull(this.description.value);
    this.user.status = this.status.value.value;
    this.user.employeeStatus = this.employeeStatus.value.value;
    this.user.aclRolesId = this.defaultItemaclRolesId.value;

    this.user.createdBy = this.commonService.getUserId()
    this.user.dateEntered = this.commonService.ConvertDateTimeToInt(new Date());
    this.user.deleted = 0;
    this.userService.addUser(this.user)
    .then(result => {
        this.onBack();
    })
    .catch(error => {
        this.errorDialog = true;
        this.errorCode =  error.status + " - " + error.statusText;
        this.contentError = JSON.parse(error._body).error;
    });
  }

  hashPassword(){
    var str = this.isNull(this.password.value);
    this.commonService.EncodeMD5(str)
    .subscribe(res =>{
      this.onSave(res);
    })
  }

  onCloseErrorDialog(){
    this.errorDialog = false;
  }

  onBack(){
    this.router.navigateByUrl("user");
  }

  isNull(value){
    if(value == null)
      return '';
    return value;
  }
}

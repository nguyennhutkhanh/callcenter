import { ContactService } from './../../shared/services/contact.service';
import { DepartmentService } from './../../shared/services/department.service';
import { RoleService } from './../../shared/services/role.service';
import { UserService } from './../../shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Email } from './../../shared/models/email';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PgService } from 'app/shared/services/pg.service';
import { CommonService } from 'app/shared/services/common.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'app/shared/models/user';
import { PasswordValidation } from 'app/shared/valdation/password-validation';
import { AccountService } from 'app/shared/services/account.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  providers: [PgService, CommonService, UserService, RoleService, DepartmentService, ContactService, AccountService]
})
export class EditUserComponent implements OnInit {
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

  newPassword: FormControl;
  confirmPassword: FormControl;

  id: string;
  
  public listItemsStatus: Array<{ text: string, value: string }> = [
    { text: "Active", value: "Active" },
    { text: "Inactive", value: "Inactive" },
  ];
  public selectedItemStatus: { text: string, value: string } = this.listItemsStatus[0];
 
  public listItemsEmployeeStatus: Array<{ text: string, value: string }> = [
    { text: "Active", value: "Active" },
      { text: "Inactive", value: "Inactive" },
  ];
  public selectedItemEmployeeStatus: { text: string, value: string } = this.listItemsEmployeeStatus[0];
  
  public listItemsUserType: Array<{ text: string, value: boolean }> = [
    { text: "System administrator", value: true },
      { text: "User", value: false },
  ];
  public selectedItemUserType: { text: string, value: boolean } = this.listItemsUserType[0];
  
  public listItemsaclRolesId: Array<{ text: string, value: string }> = [
  ];
  public defaultItemaclRolesId: { text: string, value: string };

  //Error
  errorDialog: boolean = false;
  contentError: string = "";
  errorCode: string = "";
  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private commonService: CommonService, private userService: UserService, private roleService: RoleService) { 
    this.user = new User();
  }

 ngOnInit() {
  this.createForm(this.user);
  this.getRoles();
    this.activatedRoute.params.subscribe(params => {
      this.id =  params['id'] || '';

      this.onGetUser(this.id);
   });
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

  private async onGetUser(id: string){
    this.userService.getUser(id)
    .then(result => {
      this.user = result;
      this.createForm(this.user);
    })
    .catch(error => {
      
    });
  }
  
  private createForm(data: User) {
    this.username = new FormControl(data.userName, Validators.required);
    this.password = new FormControl('');
    this.firstName = new FormControl(data.firstName, Validators.required);
    this.lastName = new FormControl(data.lastName, Validators.required);
    if(data.isAdmin == 1)
      this.isAdmin = new FormControl(this.listItemsUserType[0]);
    else
      this.isAdmin = new FormControl(this.listItemsUserType[1]);

    this.showOnEmployees = new FormControl(data.showOnEmployees);
    this.title = new FormControl(data.title);
    this.phoneWork = new FormControl(data.phoneWork);
    this.phoneMobile = new FormControl(data.phoneMobile, Validators.required);
    this.phoneOther = new FormControl(data.phoneOther);
    this.phoneFax = new FormControl(data.phoneFax);
    this.addressCountry = new FormControl(data.addressCountry);
    this.addressCity = new FormControl(data.addressCity);
    this.addressState = new FormControl(data.addressState);
    this.addressStreet = new FormControl(data.addressStreet);
    this.postalCode = new FormControl(data.addressPostalcode);
    this.description = new FormControl(data.description);
    this.emailAddress = new FormControl(data.emailAddress);
    this.aclRolesId = new FormControl(this.listItemsaclRolesId[0]);

    if(data.aclRolesId != undefined && data.aclRolesId != ''){
      this.aclRolesId = new FormControl(this.listItemsaclRolesId.filter(m => m.value == data.aclRolesId))
    }

    this.status = new FormControl(this.listItemsStatus.find(r => r.text == data.status));
    this.employeeStatus = new FormControl(this.listItemsEmployeeStatus.find(r => r.text == data.employeeStatus));

    this.newPassword = new FormControl('');
    this.confirmPassword = new FormControl('');

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
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword ,
      aclRolesId: this.aclRolesId         
    }, {
      validator: PasswordValidation.MatchPassword // your validation method
    });
  }

  onSave(password: string){
    this.user.userName = this.isNull(this.username.value);
    if(password != '')
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
    this.user.departmentId = '';
    this.user.modifiedUserId = this.commonService.getUserId();
    this.user.dateModified = this.commonService.ConvertDateTimeToInt(new Date());
    this.userService.UpdateUser(this.user)
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
    console.log("User " + this.newPassword.value);
    if(this.newPassword.value != ''){
      var str = this.isNull(this.newPassword.value);
      this.commonService.EncodeMD5(str)
      .subscribe(res =>{
        this.onSave(res);
      })
    }else{
      this.onSave('');
    }
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


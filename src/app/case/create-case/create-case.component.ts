import { CaseLog } from './../../shared/models/case-log';
import { DepartmentService } from './../../shared/services/department.service';
import { AccountJSon } from 'app/shared/models/account';
import { AccountService } from 'app/shared/services/account.service';
import { User } from './../../shared/models/user';
import { UserService } from 'app/shared/services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'app/shared/services/common.service';
import { PgService } from './../../shared/services/pg.service';
import { Component, OnInit } from '@angular/core';
import { CaseService } from 'app/shared/services/case.service';
import { Department } from 'app/shared/models/department';
import { ContactService } from 'app/shared/services/contact.service';
import { Case } from 'app/shared/models/case';

@Component({
  selector: 'app-create-case',
  templateUrl: './create-case.component.html',
  styleUrls: ['./create-case.component.scss'],
  providers: [PgService, CommonService, CaseService, UserService, AccountService, DepartmentService, ContactService]
})
export class CreateCaseComponent implements OnInit {
  form: FormGroup;
  subject: FormControl;
  description: FormControl;
  caseNumber: FormControl;
  type: FormControl;
  status: FormControl;
  priority: FormControl;
  resolution: FormControl;
  workLog: FormControl;
  accountId: FormControl;
  assignToUserId: FormControl;
  assignToDeptId: FormControl;
  case: Case;

  public listPriority: Array<{ text: string, value: number }> = [
    { text: "High", value: 0 },
    { text: "Medium", value: 1 },
    { text: "Low", value: 2 }
  ];
  public selectedPriority: { text: string, value: number } = this.listPriority[0];

  public listStatus: Array<{ text: string, value: string }> = [
    { text: "Waiting", value: '40C3A4A9-F60C-4FFD-8CF8-100C6BED0647' },
    { text: "Proccessing", value: '00E57127-9CC3-41F4-BEB3-064C02E14989' },
    { text: "Confirm Wating", value: '4FD839BD-188E-4329-B405-05002B95462D' },
    { text: "Rejected", value: '0FF820F8-7CB7-4B38-A536-55ED04EEFB5B' },
    { text: "Closed", value: '47AB1A0B-7D46-491C-9D75-63BD31F8C907' }
  ];
  public selectedStatus: { text: string, value: string } = this.listStatus[0];

  //Error
  errorDialog: boolean = false;
  contentError: string = "";
  
  //User Dialog
  userDialog: boolean = false;

  //Account Dialog
  accountDialog: boolean = false;

  //Department Dialog
  deptDialog: boolean = false;
  deptList: Department[] = [];

  caseLog: CaseLog = new CaseLog();
  constructor(private fb: FormBuilder, private router: Router, private commonService: CommonService, private caseService: CaseService, private userService: UserService, private accountService: AccountService, private deptService: DepartmentService) { 
    this.case = new Case();
    this.onGetUsers();
  }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.subject = new FormControl('', Validators.required);
    this.description = new FormControl('', Validators.required);
    this.caseNumber = new FormControl('', Validators.required);
    this.type = new FormControl('', Validators.required);
    this.status = new FormControl(this.listStatus[0], Validators.required);
    this.priority = new FormControl(this.listPriority[0] , Validators.required);
    this.resolution = new FormControl(null , Validators.required);
    this.workLog = new FormControl('');
    this.accountId = new FormControl('');
    this.assignToUserId = new FormControl('');
    this.assignToDeptId= new FormControl('');

    this.form = this.fb.group({
      subject: this.subject,
      description: this.description,
      caseNumber: this.caseNumber,
      type: this.type,
      status: this.status,
      priority: this.priority,
      resolution: this.resolution,
      workLog: this.workLog,
      accountId: this.accountId,
      assignToUserId: this.assignToUserId,
      departmentId: this.assignToDeptId
    });
  }

  onSave(){
    this.case.priority = this.isNull(this.priority.value.text);
    this.case.statusId = this.isNull(this.status.value.value);
    this.case.subject = this.isNull(this.subject.value);
    this.case.description = this.isNull(this.description.value);
    this.case.resolution = this.isNull(this.resolution.value);
    this.case.accountId = this.accountid;
    this.case.assignToId = this.userid;
    this.case.departmentId = this.deptid;
    this.case.createdBy = this.commonService.getUserId();

    this.caseService.addCase(this.case)
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
    this.router.navigateByUrl("case");
  }

  isNull(value){
    if(value == null)
      return '';
    return value;
  }

  onSelectUser(){
    this.userDialog = true;
      this.onGetUsers();
  }

  userList: User[] = [];
  private async onGetUsers(){
    this.userService.getUsers()
    .then(result => {
      this.userList = result;
      
    })
    .catch(error => {
      console.log(error);
    });
  }

  onCloseUserDialog(){
    this.userDialog = false;
  }

  userid: string = '';
  userNameModel: string = '';
  onUserSelect(item){
    this.userid = item.id;
    this.userDialog = false;
    this.deptid = item.departmentId;
    this.deptNameModel = item.departmentId;

    this.userNameModel = item.firstName + ' ' + item.lastName;;
  }

  //Account dialog
  onSelectAccount(){
    this.accountDialog = true;
      this.onGetAccounts();
  }

  accountList: Account[] = [];
  private async onGetAccounts(){
    this.accountService.getAccounts()
    .then(result => {
      this.accountList = result;
      
    })
    .catch(error => {
      console.log(error);
    });
  }

  onCloseAccountDialog(){
    this.accountDialog = false;
  }

  accountid: string = '';
  accountNameModel: string = '';
  onAccountSelect(item){
    this.accountid = item.id;
    this.accountDialog = false;

    this.accountNameModel = item.name;
  }

  ConvertIntToDateTime(value: number) {
    var month = new Date(value).getMonth() + 1;
    var day = new Date(value).getDate();
    return new Date(value).getFullYear() + "-" + (month <= 9 ? "0" + month : month) + "-" + (day <= 9 ? "0" + day : day);
  }

  onGetUserByUserID(id: string){
    console.log(this.userList);
    if(id != null && id != ''){
      var u = this.userList.find(item => item.id == id);
      if(u != undefined || u !=  null)
        return u.firstName + ' ' + u.lastName;
    }
      
    return '';
  }

  onSelectDept(){
    this.deptDialog = true;

    this.onGetDepts();
  }

  onCloseDeptDialog(){
    this.deptDialog = false;
  }

  deptid: string = '';
  deptNameModel: string = '';
  onDeptSelect(item){
    this.deptid = item.id;
    this.deptDialog = false;

    this.deptNameModel = item.name;
  }

  onGetDepts(){
    this.deptService.getDepts()
    .then(result =>{
      this.deptList = result;
    })
    .catch(error => {
      console.log(error);
    })
  }

  onGetDept(id: string){
    
  }
}

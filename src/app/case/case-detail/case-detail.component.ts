import { CaseLogService } from './../../shared/services/case-log.service';
import { CaseLog } from './../../shared/models/case-log';
import { DepartmentService } from './../../shared/services/department.service';
import { UserService } from 'app/shared/services/user.service';
import { ContactService } from 'app/shared/services/contact.service';
import { CommonService } from './../../shared/services/common.service';
import { Contact } from './../../shared/models/contact';
import { Account } from './../../shared/models/account';
import { ActivatedRoute, Router } from '@angular/router';
import { Case } from 'app/shared/models/case';
import { Component, OnInit } from '@angular/core';
import { CaseService } from './../../shared/services/case.service';
import { AccountService } from 'app/shared/services/account.service';

@Component({
  selector: 'app-case-detail',
  templateUrl: './case-detail.component.html',
  styleUrls: ['./case-detail.component.scss'],
  providers: [CaseService, AccountService, CommonService, ContactService, UserService, DepartmentService, CaseLogService]
})
export class CaseDetailComponent implements OnInit {

  id: string;
  case: Case;
  caseLog: CaseLog[] = [];
  account: Account = new Account();
  contact: Contact = new Contact();

  //Dialog
  usersDialog: boolean = false;
  statusId=1;

  public listStatus: Array<{text: string, id: string, value: number }> = [
    { text: "Waiting", id: "40C3A4A9-F60C-4FFD-8CF8-100C6BED0647", value: 1 },
    { text: "Proccessing", id: "00E57127-9CC3-41F4-BEB3-064C02E14989", value: 2 },
    { text: "Confirm Wating", id: "4FD839BD-188E-4329-B405-05002B95462D", value: 3 },
    { text: "Rejected", id: "0FF820F8-7CB7-4B38-A536-55ED04EEFB5B", value: 4 },
    { text: "Closed", id: "47AB1A0B-7D46-491C-9D75-63BD31F8C907", value: 5 }
  ];
  constructor(public router: Router, private activatedRoute: ActivatedRoute, private caseService: CaseService, private accountService: AccountService, private commonService: CommonService, private caseLogService: CaseLogService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id =  params['id'] || '';

      this.onGetCase(this.id);

      this.onGetCaseLogByCase(this.id);
   });
  }

  private async onGetCase(id: string){
    this.caseService.getCase(id)
    .then(result => {
      this.case = result;
      this.statusId = this.status(result.statusId);
      this.onGetAccount(result.accountId);      
    })
    .catch(error => {
    });
  }

  private async onGetCaseLogByCase(id: string){
    this.caseLogService.getCaseLogsByCase(id)
    .then(result => {
      this.caseLog = result;
    })
    .catch(error => {
    });
  }
  
  private async onGetAccount(id: string){
    this.accountService.getAccount(id)
    .then(result => {
      this.account = result;
    })
    .catch(error => {
    });
  }

  private async onGetContact(id: string){
    this.caseService.getCase(id)
    .then(result => {
      this.case = result;
    })
    .catch(error => {
    });
  }
  
  ConvertIntToDateTime(value: number) {
    var month = new Date(value).getMonth() + 1;
    var day = new Date(value).getDate();
    return new Date(value).getFullYear() + "-" + (month <= 9 ? "0" + month : month) + "-" + (day <= 9 ? "0" + day : day);
  }

  onBack(){
    this.router.navigateByUrl("list-case");
  }

  onAcceptCase(){
    this.case.assignToId = this.commonService.getUserId();
    this.case.statusId = '00E57127-9CC3-41F4-BEB3-064C02E14989';
    this.caseService.updateCase(this.case)
    .then(result => {
      this.router.navigate(["case/edit-case", this.case.id]);
    })
    .catch(error => {

    });
  }

  onDeniedCase(){
    this.usersDialog = true;
  }

  onCloseDialog(){
    this.usersDialog = false;
  }

  reason: string;
  onSave(){
    this.case.reason = this.reason;
    this.case.statusId = '0FF820F8-7CB7-4B38-A536-55ED04EEFB5B';
    this.caseService.updateCase(this.case)
    .then(result => {
      this.router.navigateByUrl("list-case");
    })
    .catch(error => {

    });
  }

  public status(statusid : string){
    return this.listStatus.find(r => r.id == statusid).value;
  }

  public statusName(statusid : string){
    return this.listStatus.find(r => r.id == statusid).text;
  }

  onProcessCase(){
    this.router.navigate(["case/edit-case", this.case.id]);
  }

  onClose(){
    this.case.statusId = '47AB1A0B-7D46-491C-9D75-63BD31F8C907';
    this.caseService.updateCase(this.case)
    .then(result => {
      this.router.navigateByUrl("list-case");
    })
    .catch(error => {

    });
  }
}

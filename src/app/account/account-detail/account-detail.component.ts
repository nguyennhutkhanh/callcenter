import { UserService } from './../../shared/services/user.service';
import { AccountJSon } from 'app/shared/models/account';
import { AccountService } from './../../shared/services/account.service';
import { User } from 'app/shared/models/user';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
  providers: [AccountService, UserService]
})
export class AccountDetailComponent implements OnInit {
  id: string;
  account: AccountJSon = new AccountJSon();
  constructor(public router: Router, private activatedRoute: ActivatedRoute, private accountService: AccountService, private userService: UserService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id =  params['id'] || '';

      this.onGetAccount(this.id);
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

  onGetUser(id: string){
    var user: any;
    this.userService.getUser(id)
    .then(result => {
      console.log(result);
      user = result;
    })
    .catch(error => {
    });

    if(user != null)
      return user.firstName + ' ' + user.lastName;
    else
      return ''
  }
  
  ConvertIntToDateTime(value: number) {
    var month = new Date(value).getMonth() + 1;
    var day = new Date(value).getDate();
    return new Date(value).getFullYear() + "-" + (month <= 9 ? "0" + month : month) + "-" + (day <= 9 ? "0" + day : day);
  }

  onEdit(id: string){
    this.router.navigate(["account/edit-account", id]);
  }

  onBack(){
    this.router.navigateByUrl("account");
  }
}

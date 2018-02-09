import { ContactService } from 'app/shared/services/contact.service';
import { UserService } from './../shared/services/user.service';
import { LoginService } from './../shared/services/login.service';
import { PgService } from './../shared/services/pg.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/shared/services/common.service';
import { AccountService } from 'app/shared/services/account.service';
import { DepartmentService } from 'app/shared/services/department.service';

@Component({
  templateUrl: 'login.component.html',
  providers: [LoginService, PgService, CommonService, UserService, AccountService, ContactService, DepartmentService], 
})
export class LoginComponent {
  form: FormGroup;
  usernameCtrl: FormControl;
  passwordCtrl: FormControl;
  invalidLogin = false;

  constructor(private fb: FormBuilder, public router: Router, public loginService: LoginService, public commonService: CommonService, private userService: UserService) {
    this.usernameCtrl = new FormControl('', Validators.required);
    this.passwordCtrl = new FormControl('', Validators.required);
    this.form = this.fb.group({
      username: this.usernameCtrl,
      password: this.passwordCtrl
    });

    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
   }

  OnInit(){
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(){
    this.commonService.EncodeMD5(this.passwordCtrl.value)
    .subscribe(data => {
      this.loginService.login(this.usernameCtrl.value, data)
      .then(result => {
        if(result.token != null && result.token != undefined){
          this.loginService.saveTokenInfoLocal(result.token);
      
          this.onGetUserInfo(this.usernameCtrl.value);
        }else{
          this.invalidLogin = true;
          this.router.navigate(['/']);
        }
      })
      .catch(error => {
        this.invalidLogin = true;
      });
     });;
  }

  onGetUserInfo(userName: string){
    this.userService.getUsers()
    .then(res =>{
      var user = res.filter(item => item.userName == userName)[0];
      this.loginService.saveUserInfoLocal(user);
      this.router.navigateByUrl("/dashboard");
    })
    .catch(error =>{
      console.log("Error: " + error);
    })
  }
}

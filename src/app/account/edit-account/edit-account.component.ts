import { DepartmentService } from 'app/shared/services/department.service';
import { ContactService } from './../../shared/services/contact.service';
import { UserService } from 'app/shared/services/user.service';
import { Account, AccountJSon } from './../../shared/models/account';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from './../../shared/services/account.service';
import { CommonService } from './../../shared/services/common.service';
import { PgService } from 'app/shared/services/pg.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss'],
  providers: [PgService, CommonService,  AccountService, UserService, ContactService, DepartmentService]
})
export class EditAccountComponent implements OnInit {
    form: FormGroup;
    name: FormControl;
    accountType: FormControl;
    website: FormControl;
    phoneOffice: FormControl;
    billingAddressCountry: FormControl;
    billingAddressCity: FormControl;
    billingAddressState: FormControl;
    billingAddressStreet: FormControl;
    phoneFax: FormControl;
    shippingAddressCountry: FormControl;
    shippingAddressCity: FormControl;
    shippingAddressState: FormControl;
    shippingAddressStreet: FormControl;
    description: FormControl;
    ownerShip: FormControl;
    industry: FormControl;
    parentId: FormControl;
    rating: FormControl;
    billingAddressPostCode: FormControl;
    shippingAddressPostCode: FormControl;
    
    account: AccountJSon;
    id: string;
    public listItemsAccountType: Array<{ text: string, value: boolean }> = [
      { text: "System", value: true },
        { text: "User", value: false },
    ];
    public selectedItemAccountType: { text: string, value: boolean } = this.listItemsAccountType[0];
  
    public listItemsParentAccount: Array<{ text: string, value: string }> = [
      {text: 'Please select', value: ''}
    ];
    public selectedItemParentAccount: { text: string, value: string } = this.listItemsParentAccount[0];
  
    //Error
    errorDialog: boolean = false;
    contentError: string = "";
  
    constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private commonService: CommonService, private accountService: AccountService) { 
      this.account = new AccountJSon();
    }
  
    ngOnInit() {
      this.onGetAccounts();
      this.createForm(this.account);

      this.activatedRoute.params.subscribe(params => {
        this.id = params['id'] || '';
  
        this.onGetAccount(this.id);
  
        console.log(this.account);
     });
    }
  
    private async onGetAccounts(){
      this.accountService.getAccounts()
      .then(result => {
        result.forEach(element => {
          this.listItemsParentAccount.push({text: element.name, value: element.id});
        });
        
      })
      .catch(error => {
        console.log(error);
      });
    }
  
    private async onGetAccount(id: string){
      this.accountService.getAccount(id)
      .then(result => {
        this.account = result;
        console.log(this.account);
        this.createForm(this.account);
      })
      .catch(error => {
        console.log(error);
      });
    }

    private createForm(account: AccountJSon) {
      this.name = new FormControl(account.name, Validators.required);
      this.accountType = new FormControl(this.listItemsAccountType.find(res => res.value == this.isNull(this.accountType)));
      this.website = new FormControl(account.website);
      this.phoneOffice = new FormControl(account.phoneOffice, Validators.required);
      this.billingAddressCountry = new FormControl(account.billingAddressCountry);
      this.billingAddressCity = new FormControl(account.billingAddressCity);
      this.billingAddressState = new FormControl(account.billingAddressState);
      this.billingAddressStreet = new FormControl(account.billingAddressStreet);
      this.billingAddressPostCode = new FormControl(account.billingAddressPostalcode);
      this.phoneFax = new FormControl(account.phoneFax);
      this.shippingAddressCountry = new FormControl(account.shippingAddressCountry);
      this.shippingAddressCity = new FormControl(account.shippingAddressCity);
      this.shippingAddressState = new FormControl(account.shippingAddressState);
      this.shippingAddressStreet = new FormControl(account.shippingAddressStreet);
      this.shippingAddressPostCode = new FormControl(account.shippingAddressPostalcode);
      this.description = new FormControl(account.description);
      this.ownerShip = new FormControl(account.ownerShip);
      this.industry = new FormControl(account.industry);
      this.parentId = new FormControl(this.listItemsParentAccount.find(res => res.value == this.isNull(this.parentId)));
      this.rating = new FormControl(account.rating);
  
      this.form = this.fb.group({
        name: this.name,
        accountType: this.accountType,
        website: this.website,
        phoneOffice: this.phoneOffice,
        billingAddressCountry: this.billingAddressCountry,
        billingAddressCity: this.billingAddressCity,
        billingAddressState: this.billingAddressState,
        billingAddressStreet: this.billingAddressStreet,
        billingAddressPostCode: this.billingAddressPostCode,
        phoneFax: this.phoneFax,
        shippingAddressCountry: this.shippingAddressCountry,
        shippingAddressCity: this.shippingAddressCity,
        shippingAddressState: this.shippingAddressState,
        shippingAddressStreet: this.shippingAddressStreet,
        shippingAddressPostCode: this.shippingAddressPostCode,
        description: this.description,
        ownerShip: this.ownerShip,
        industry: this.industry,
        parentId: this.parentId,
        rating: this.rating,
      });
    }
  
    onSave(){
      this.account.name = this.isNull(this.name.value);
      this.account.accountType = this.isNull(this.accountType.value);
      this.account.website = this.isNull(this.website.value);
      this.account.phoneOffice = this.isNull(this.phoneOffice.value);
      this.account.billingAddressCountry = this.isNull(this.billingAddressCountry.value);
      this.account.billingAddressCity = this.isNull(this.billingAddressCity.value);
      this.account.billingAddressState = this.isNull(this.billingAddressState.value);
      this.account.billingAddressStreet = this.isNull(this.billingAddressStreet.value);
      this.account.billingAddressPostalcode = this.isNull(this.billingAddressPostCode.value);
      this.account.phoneFax = this.isNull(this.phoneFax.value);
      this.account.shippingAddressCountry = this.isNull(this.shippingAddressCountry.value);
      this.account.shippingAddressCity = this.isNull(this.shippingAddressCity.value);
      this.account.shippingAddressState = this.isNull(this.shippingAddressState.value);
      this.account.shippingAddressStreet = this.isNull(this.shippingAddressStreet.value);
      this.account.shippingAddressPostalcode = this.isNull(this.shippingAddressPostCode.value);
      this.account.description = this.isNull(this.description.value);
      this.ownerShip = this.isNull(this.ownerShip.value);
      this.industry = this.isNull(this.industry.value);
      this.parentId = this.isNull(this.parentId.value) == '' ? '' : this.parentId.value.value;
      this.rating = this.isNull(this.rating.value);
  
      this.account.modifiedUserId = this.commonService.getUserId();
      this.account.dateModified = this.commonService.ConvertDateTimeToInt(new Date());
  
      this.accountService.updateAccount(this.account)
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
      this.router.navigateByUrl("account");
    }
  
    isNull(value){
      if(value == null)
        return '';
      return value;
    }

}

import { DepartmentService } from './../../shared/services/department.service';
import { Department } from './../../shared/models/department';
import { ContactService } from './../../shared/services/contact.service';
import { UserService } from 'app/shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from './../../shared/services/account.service';
import { CommonService } from './../../shared/services/common.service';
import { PgService } from 'app/shared/services/pg.service';
import { Component, OnInit } from '@angular/core';
import { AccountJSon } from 'app/shared/models/account';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  providers: [PgService, CommonService, AccountService, UserService, ContactService, DepartmentService]
})
export class CreateAccountComponent implements OnInit {
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

  phone: string;
  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private commonService: CommonService, private accountService: AccountService) { 
    this.account = new AccountJSon();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.phone =  params['phone'] || '';

   });

    this.onGetAccounts();
    this.createForm();
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

  private createForm() {
    this.name = new FormControl('', Validators.required);
    this.accountType = new FormControl(this.listItemsAccountType[0], Validators.required);
    this.website = new FormControl('');
    this.phoneOffice = new FormControl(this.phone);
    this.billingAddressCountry = new FormControl('');
    this.billingAddressCity = new FormControl('');
    this.billingAddressState = new FormControl('');
    this.billingAddressStreet = new FormControl('');
    this.billingAddressPostCode = new FormControl('');
    this.phoneFax = new FormControl('');
    this.shippingAddressCountry = new FormControl('');
    this.shippingAddressCity = new FormControl('');
    this.shippingAddressState = new FormControl('');
    this.shippingAddressStreet = new FormControl('');
    this.shippingAddressPostCode = new FormControl('');
    this.description = new FormControl('');
    this.ownerShip = new FormControl('');
    this.industry = new FormControl('');
    this.parentId = new FormControl(this.listItemsParentAccount[0]);
    this.rating = new FormControl('');

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
    this.account.accountType = this.isNull(this.accountType.value.value);
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
    this.account.description = this.isNull(this.description.value);
    this.ownerShip = this.isNull(this.ownerShip.value);
    this.industry = this.isNull(this.industry.value);
    this.parentId = this.isNull(this.parentId.value) == '' ? '' : this.parentId.value.value;
    this.rating = this.isNull(this.rating.value);

    this.account.createdBy = this.commonService.getUserId();
    this.account.dateEntered = this.commonService.ConvertDateTimeToInt(new Date());
    this.account.deleted = 0;

    this.accountService.addAccount(this.account)
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

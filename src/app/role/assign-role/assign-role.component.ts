import { ContactService } from './../../shared/services/contact.service';
import { DepartmentService } from './../../shared/services/department.service';
import { Department } from './../../shared/models/department';
import { UserService } from 'app/shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RoleService } from './../../shared/services/role.service';
import { Component, OnInit } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { Role } from 'app/shared/models/role';
import { AccountService } from 'app/shared/services/account.service';

@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.scss'],
  providers: [RoleService, UserService, AccountService, DepartmentService, ContactService]

})
export class AssignRoleComponent implements OnInit {
  aclRole: Array<{ text: string, value: number }> = [
      { text: "YES", value: 0 },
      { text: "NO", value: 1 }
  ];

  colNameModel: any[] = [];
  colName: any[] = [];
  id: string;

  show: any[] = [];
  public aclRoleSelected: { text: string, value: number } = this.aclRole[0];
  role: Role = new Role();
  constructor(public roleService: RoleService, private activatedRoute: ActivatedRoute, private router: Router) { 
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id =  params['id'] || '';

      
   });

    this.colName[0] = {"name":"Account", "value": []};
    this.colName[1] = {"name":"Call", "value": []};
    this.colName[2] = {"name":"Case", "value": []};
    this.colName[3] = {"name":"Contact", "value": []};
    this.onGetRole(this.id);
    this.getActionNameRole(this.id);
  }

  private async onGetRole(id: string){
    this.roleService.getRole(id)
    .then(result => {
      this.role = result;
    })
    .catch(error => {
      console.log(error);
    });
  }

  getActionNameRole(id: string){
    this.roleService.getActionNameRole()
    .then(result => {
      this.colNameModel = result;
      this.getValueNameRole(id);
    })
    .catch(error => {
      console.log(error);
    })
  }

  getValueNameRole(id: string){
    this.roleService.getActionValueRole(id)
    .then(result => {
      var categoryName: any [] = [];
      if(result.length != undefined){
        categoryName[0] = result.filter(res => res.category == "accounts");
        categoryName[1] = result.filter(res => res.category == "calls");
        categoryName[2] = result.filter(res => res.category == "cases");
        categoryName[3] = result.filter(res => res.category == "contacts");
      }else{
        categoryName[0] = [];
        categoryName[1] = [];
        categoryName[2] = [];
        categoryName[3] = [];
      }

      for(var i = 0; i < this.colNameModel.length; i++){
        if(categoryName[0].length != 0)
          categoryName[0].forEach(element => {
            if(this.colName[0] && this.colName[0].value[i] == undefined){
             this.colName[0].value[i] =  {"id": "0" + i, "value": "1", "text" : "NO", "action": this.colNameModel[i]};
            }
            
            if(this.colName[0].value[i].id.length <= 2){
              this.colNameModel[i] == element.name  ? this.colName[0].value[i].id = element.id : "0" + i;
              this.colNameModel[i] == element.name  ? this.colName[0].value[i].value = '0' : '1';
              this.colNameModel[i] == element.name  ? this.colName[0].value[i].text = "YES" : this.colName[0].value[i].text ="NO";
              this.colNameModel[i] == element.name  ? this.colName[0].value[i].action = this.colNameModel[i] : element.name;
            }
            
          });
        else{
          this.colName[0].value[i] =  {"id":"0" + i, "value": "1", "text" : "NO", "action": this.colNameModel[i]};
        }

        if(categoryName[1].length != 0)
          categoryName[1].forEach(element => {
            if(this.colName[1] && this.colName[1].value[i] == undefined){
              this.colName[1].value[i] = {"id": "1" + i, "value": "1", "text" : "NO", "action": this.colNameModel[i]};
            }

            if(this.colName[1].value[i].id.length <= 2){
              this.colNameModel[i] == element.name  ? this.colName[1].value[i].id = element.id : "1" + i;
              this.colNameModel[i] == element.name  ? this.colName[1].value[i].value = '0' : '1';
              this.colNameModel[i] == element.name  ? this.colName[1].value[i].text = "YES" : this.colName[1].value[i].text ="NO";
              this.colNameModel[i] == element.name  ? this.colName[1].value[i].action = this.colNameModel[i] : element.name;
            }
            
          });
        else{
          this.colName[1].value[i] =  {"id": "1" + i, "value": "1", "text" : "NO", "action": this.colNameModel[i]};
        }
          

        if(categoryName[2].length != 0)
          categoryName[2].forEach(element => {
            if(this.colName[2] && this.colName[2].value[i] == undefined){
              this.colName[2].value[i] =  {"id": "2" + i, "value": "1", "text" : "NO", "action": this.colNameModel[i]};
            }

            if(this.colName[2].value[i].id.length <= 2){
              this.colNameModel[i] == element.name  ? this.colName[2].value[i].id = element.id : "2" + i;
              this.colNameModel[i] == element.name  ? this.colName[2].value[i].value = '0' : '1';
              this.colNameModel[i] == element.name  ? this.colName[2].value[i].text = "YES" : this.colName[2].value[i].text ="NO";
              this.colNameModel[i] == element.name  ? this.colName[2].value[i].action = this.colNameModel[i] : element.name;
            }
          });
        else{
          this.colName[2].value[i] =  {"id": "2" + i, "value": "1", "text" : "NO", "action": this.colNameModel[i]};
        }
          
        if(categoryName[3].length != 0)
          categoryName[3].forEach(element => {
            if(this.colName[3] && this.colName[3].value[i] == undefined){
              this.colName[3].value[i] =  {"id": "3" + i, "value": "1", "text" : "NO", "action": this.colNameModel[i]};
            }

            if(this.colName[3].value[i].id.length <= 2){
              this.colNameModel[i] == element.name  ? this.colName[3].value[i].id = element.id : "3" + i;
              this.colNameModel[i] == element.name  ? this.colName[3].value[i].value = '0' : '1';
              this.colNameModel[i] == element.name  ? this.colName[3].value[i].text = "YES" : this.colName[2].value[i].text ="NO";
              this.colNameModel[i] == element.name  ? this.colName[3].value[i].action = this.colNameModel[i] : element.name;
            }
          });
        else{
          this.colName[3].value[i] =  {"id": "3" + i, "value": "1", "text" : "NO", "action": this.colNameModel[i]};
        }
      }
    })
    .catch(error => {
      console.log(error);
    })
  }

  ids: string = '';
  value: number = 0;
  name: string = '';
  action: string = '';
  onShow(event, item1, item){
    this.aclRoleSelected = this.aclRole.filter(m => m.value == item1.value)[0];

    if(this.ids!= '' && this.ids != item1.id){
      this.saveRoleAction(this.id, item1.value, item1.id, item.name, item1.action);
    }else{
      this.ids = item1.id;
      this.name = item.name;
      this.action = item1.action;

      console.log("Value: " + this.value)
    }
  } 

  saveRoleAction(roleId: string, assign: number, newid: string, name: string, action: string){
    this.roleService.getActionValue(this.name+"s", this.action)
    .then(result => {
      this.roleService.addOrUpdateActionRole(roleId, result.id, this.value)
        .then(result1 => {
            this.ids = newid;
            this.name = name;
            this.action = action;
            this.getValueNameRole(this.id);
        })
        .catch(error => {
          if(error.status == undefined){
            this.ids = newid;
            this.name = name;
            this.action = action;
          }
          this.getValueNameRole(this.id);
        });
    })
    .catch(error => {

    });    
  }

  onBack(){
    this.router.navigateByUrl("role");
  }

  selectionChange(event){
    this.value = event.value;
  }
}
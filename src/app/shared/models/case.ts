import { AccountJSon } from 'app/shared/models/account';
import { Account } from './account';
import { CaseStatus } from "app/shared/models/case-status";

export class Case{
    id: string;
    assignToId: string;
    caseNumber: number;
    createdBy: string;
    createdByName: string;
    dateEntered: Date;
    dateModified: Date;
    deleted: boolean;
    description: string;
    modifiedUserId: string;
    modifiedUserName: string;
    subject: string;
    priority: string;
    resolution: string;
    type: string;
    workLog: string;
    departmentId: string;
    departmentName: string;
    accountId: string;
    accountName: string;
    reason: string;
    statusId: string;
    statusName: string;
    oldUser: string;
}

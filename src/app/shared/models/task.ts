export class Task{
    id: string;
    name: string;
    date_entered: Date;
    date_modified: Date;
    modified_user_id: string;
    created_by: string;
    description: string;
    deleted: boolean;
    assigned_user_id: string;
    status: string;
    date_due_flag: boolean;
    date_due: Date;
    date_start_flag: boolean;
    date_start: Date;
    parent_type:string;
    parent_id: string;
    contact_id: string;
    priority: string;
}

export class TaskJson{
    id: string;
    name: string;
    dateEntered: Date;
    dateModified: Date;
    modifiedUserId: string;
    createdBy: string;
    description: string;
    deleted: boolean;
    assignedUserId: string;
    status: string;
    dateDueFlag: boolean;
    dateDue: Date;
    dateStartFlag: boolean;
    dateStart: Date;
    parentType:string;
    parentId: string;
    contactId: string;
    priority: string;
}
export class Role{
    id: string;
    date_entered: Date;
    date_modified: Date;
    modified_user_id: string;
    created_by: string;
    name: string;
    description: string;
    modules: string;
    deleted: boolean;
}

export class RoleJSon{
    id: string;
    dateEntered: Date;
    dateModified: Date;
    modifiedUserId: string;
    createdBy: string;
    name: string;
    description: string;
    modules: string;
    deleted: boolean;
}
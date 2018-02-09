export class Project{
    id: string;
    date_entered: Date;
    date_modified: Date;
    assigned_user_id: string;
    modified_user_id: string;
    created_by: string;
    deleted: boolean;
    date_sent: Date;
    message_id: string;
    name: string;
    type: string;
    status: string;
    flagged: boolean;
    reply_to_status: boolean;
    intent: string;
    mailbox_id: string;
    parent_type: string;
    parent_id: string;
}

export class ProjectJSon{
    id: string;
    dateEntered: Date;
    dateModified: Date;
    assignedUserId: string;
    modifiedUserId: string;
    createdBy: string;
    deleted: boolean;
    dateSent: Date;
    messageId: string;
    name: string;
    type: string;
    status: string;
    flagged: boolean;
    replyToStatus: boolean;
    intent: string;
    mailboxId: string;
    parentType: string;
    parentId: string;
}
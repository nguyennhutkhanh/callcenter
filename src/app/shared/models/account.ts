export class Account{
    id: string;
    name: string;
    date_entered: Date;
    date_modified: Date;
    modified_user_id: string;
    created_by: string;
    description: string;
    deleted: boolean;
    assigned_user_id: string;
    account_type: string;
    industry: string;
    annual_revenue: string;
    phone_tax: string;
    billing_address_street: string;
    billing_address_city: string;
    billing_address_state: string;
    billing_address_postalcode: string;
    billing_address_country: string;
    rating: string;
    phone_office: string;
    phone_alternate: string;
    website: string;
    ownership: string;
    employees: string;
    ticker_sysbol: string;
    shipping_address_street: string;
    shipping_address_city: string;
    shipping_address_state: string;
    shipping_address_postalcode: string;
    shipping_address_country: string;
    parent_id: string;
}

export class AccountJSon{
    id: string;
    name: string;
    dateEntered: number;
    dateModified: number;
    modifiedUserId: string;
    createdBy: string;
    description: string;
    deleted: number;
    assignedUserId: string;
    accountType: string;
    industry: string;
    annualRevenue: string;
    phoneFax: string;
    billingAddressStreet: string;
    billingAddressCity: string;
    billingAddressState: string;
    billingAddressPostalcode: string;
    billingAddressCountry: string;
    rating: string;
    phoneOffice: string;
    phoneAlternate: string;
    website: string;
    ownerShip: string;
    employees: string;
    tickerSymbol: string;
    shippingAddressStreet: string;
    shippingAddressCity: string;
    shippingAddressState: string;
    shippingAddressPostalcode: string;
    shippingAddressCountry: string;
    parentId: string;
}
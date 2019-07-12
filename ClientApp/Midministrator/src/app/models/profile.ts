export interface Profile {
    id: number;
    accountId: number;
    agentId?: number;
    company: string;
    phoneNumber: string;
    mobilePhone: string;
    givenName: string;
    familyName: string;
    name: string;
    location: string;
    address: string;
    deleted?: any;
    deletedBy?: any;
    isDeleted: boolean;
    modified: Date;
    modifiedBy: number;
}
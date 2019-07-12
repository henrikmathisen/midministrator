import { Profile } from './profile';
import { AccountGroup } from './account-group';

export interface MidentityAccount {
    id: number;
    userName: string;
    email: string;
    isActive: boolean;
    isDeleted: boolean;
    deletedBy?: any;
    password: string;
    passwordResetToken: string;
    passwordSalt: string;
    passwordResetTokenExpiration?: Date;
    deleted?: any;
    created: Date;
    updated: Date;
    lastLogin?: Date;
    passwordChanged?: any;
    hsaId: string;
    applicationRoles: any[];
    accountGroups: AccountGroup[];
    tenantAccounts: any[];
    profile: Profile;
    adfssid: string;
    azureId: string;
    nameIdentifier: string;
    defaultTenantId?: any;
    socialSecurityNumber?: any;
    legacyAccount?: any;
    defaultTenant?: any;
}
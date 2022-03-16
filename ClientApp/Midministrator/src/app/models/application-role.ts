import { Group } from "./group";
import { Application } from "./application";
import { Role } from "./role";
import { Tenant } from './tenant';
import { MidentityAccount } from "./account";

export interface ApplicationRole {
    id: number;
    groupId: number;
    accountId: number;
    roleId: number;
    applicationId: number;
    tenantId: number;
    isActive: boolean;
    isDeleted: boolean;
    created: Date;
    deleted: Date;
    deletedBy: number;
    group: Group;
    account: MidentityAccount;
    role: Role;
    application: Application;
    tenant: Tenant;
}
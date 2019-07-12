import { ApplicationRole } from "./application-role";
import { AccountGroup } from "./account-group";

export interface Group {
    id: number;
    created: Date;
    deleted: boolean;
    azureId: string;
    name: string;
    mail: string;
    description: string;
    aDFSSID: string;
    isActive: boolean;
    applicationRoles: ApplicationRole[];
    accountGroups: AccountGroup[];
}



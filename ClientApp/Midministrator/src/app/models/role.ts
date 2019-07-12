import { ApplicationRole } from './application-role';

export class Role {
    id: number;
    description: string;
    name: string;
    isDeleted: boolean;
    created: Date;
    modified: Date;
    applicationRoles: ApplicationRole[];
}
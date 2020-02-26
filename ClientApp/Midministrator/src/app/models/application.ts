import { ApplicationRole } from "./application-role";
import { Client } from './client';
import { ClientApplication } from './client-application';

export class Application {
    id: number;
    deleted: Date;
    isDeleted: boolean;
    name: string;
    url: string;
    clientApplications: ClientApplication[];
    applicationRoles: ApplicationRole[];
  clientIds: any[];
    constructor() {
        this.id = 0;
        this.applicationRoles = [];
        this.clientApplications = [];
    }
}
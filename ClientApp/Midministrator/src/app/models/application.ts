import { ApplicationRole } from "./application-role";
import { Client } from './client';

export class Application {
    id: number;
    deleted: Date;
    isDeleted: boolean;
    name: string;
    url: string;
    clientId: number;
    client: Client;
    applicationRoles: ApplicationRole[];
    constructor() {
        this.id = 0;
    }
}
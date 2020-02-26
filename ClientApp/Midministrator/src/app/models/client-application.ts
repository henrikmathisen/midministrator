import { Group } from './group';
import { MidentityAccount } from './account';
import { Client } from './client';
import { Application } from './application';

export interface ClientApplication {
    applicationId: number;
    clientId: number;
    client: Client;
    application: Application;
}
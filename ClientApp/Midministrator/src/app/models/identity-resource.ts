export class IdentityResource {
    id: number;
    enabled: boolean;
    name: string;
    displayName: string;
    description: string;
    required: boolean;
    emphasize: boolean;
    showInDiscoveryDocument: boolean;
    userClaims: IdentityClaim[];
    properties: IdentityResourceProperty[];
    created: Date;
    updated: Date;
    nonEditable: boolean;
    constructor() {
        this.id = 0;
        this.enabled = true;
        this.name = '';
        this.displayName = '';
        this.description = '';
        this.required = false;
        this.emphasize = false;
        this.showInDiscoveryDocument = false;
        this.userClaims = [];
        this.properties = [];
        this.created = new Date(Date.now()),
        this.updated = new Date(Date.now()),
        this.nonEditable = false
    }
}

export interface IdentityClaim  {
    id: number;
    type: string;
    identityResourceId: number;
}

export interface IdentityResourceProperty {
    id: number;
    key: string;
    value: string;
    identityResourceId: number;
}
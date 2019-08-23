export class ApiResource {
    id: number;
    enabled: boolean;
    name: string;
    displayName: string;
    description: string;
    secrets: ApiSecret[];
    scopes: ApiScope[];
    userClaims: ApiResourceClaim[];
    properties: ApiResourceProperty[];
    created: Date;
    updated: Date;
    lastAccessed: Date;
    nonEditable: boolean;

    constructor() {
        this.id = 0;
        this.enabled = true;
        this.name = '';
        this.displayName = '';
        this.description = '';
        this.secrets = [];
        this.scopes = [];
        this.userClaims = [];
        this.properties = [];
    }

}

export interface ApiSecret {
    apiResourceId: number;
    id: number;
    description: string;
    value: string;
    expiration: Date;
    type: string;
    created: Date;
}

export interface ApiScope {
    id: number;
    name: string;
    displayName: string;
    description: string;
    required: boolean;
    emphasize: boolean;
    showInDiscoveryDocument: boolean;
    userClaims: ApiScopeClaim[];
    apiResourceId: number;
}

export interface ApiResourceClaim  {
    id: number;
    type: string;
    apiResourceId: number;
}

export interface ApiResourceProperty {
    apiResourceId: number;
    id: number;
    key: string;
    value: string;
}

export interface ApiScopeClaim  {
    id: number;
    type: string;
    apiScopeId: number;
}
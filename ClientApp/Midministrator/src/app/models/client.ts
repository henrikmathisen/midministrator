export class ClientViewModel {
    client: Client;
    availableScopes?: string[];
    clientView: ClientView;
}

export class Client {
    authorizationCodeLifetime: number;
    consentLifetime: number;
    absoluteRefreshTokenLifetime: number;
    slidingRefreshTokenLifetime: number;
    refreshTokenUsage: number;
    updateAccessTokenClaimsOnRefresh: boolean;
    refreshTokenExpiration: number;
    accessTokenType: number;
    enableLocalLogin: boolean;
    identityProviderRestrictions: ClientIdPRestriction[];
    accessTokenLifetime: number;
    includeJwtId: boolean;
    alwaysSendClientClaims: boolean;
    clientClaimsPrefix: string;
    pairWiseSubjectSalt: string;
    allowedCorsOrigins: ClientCorsOrigin[];
    properties: ClientProperty[];
    created: Date;
    updated: Date;
    lastAccessed: Date;
    userSsoLifetime: number;
    userCodeType: string;
    claims: ClientClaim[];
    identityTokenLifetime: number;
    allowedScopes: ClientScope[];
    allowOfflineAccess: boolean;
    id: number;
    enabled: boolean;
    clientId: string;
    protocolType: string;
    clientSecrets: ClientSecret[];
    requireClientSecret: boolean;
    clientName: string;
    description: string;
    clientUri: string;
    logoUri: string;
    requireConsent: boolean;
    allowRememberConsent: boolean;
    alwaysIncludeUserClaimsInIdToken: boolean;
    allowedGrantTypes: ClientGrantType[];
    requirePkce: boolean;
    allowPlainTextPkce: boolean;
    allowAccessTokensViaBrowser: boolean;
    redirectUris: ClientRedirectUri[];
    postLogoutRedirectUris: ClientPostLogoutRedirectUri[];
    frontChannelLogoutUri: string;
    frontChannelLogoutSessionRequired: boolean;
    backChannelLogoutUri: string;
    backChannelLogoutSessionRequired: boolean;
    deviceCodeLifetime: number;
    nonEditable: boolean;
    constructor() {
        this.id = 0;
        this.absoluteRefreshTokenLifetime = 2592000;
        this.accessTokenLifetime = 3600;
        this.accessTokenType = 0;
        this.allowAccessTokensViaBrowser = true;
        this.allowOfflineAccess = true;
        this.allowPlainTextPkce = false;
        this.allowRememberConsent = true;
        this.alwaysIncludeUserClaimsInIdToken = true;
        this.alwaysSendClientClaims = true;
        this.authorizationCodeLifetime = 300;
        this.backChannelLogoutSessionRequired = true;
        this.clientClaimsPrefix = '_client';
        this.enableLocalLogin = false;
        this.enabled = true;
        this.frontChannelLogoutSessionRequired = true;
        this.identityTokenLifetime = 300;
        this.includeJwtId = true;
        this.protocolType = 'oidc';
        this.refreshTokenExpiration = 1;
        this.refreshTokenUsage = 1;
        this.requireClientSecret = true;
        this.requireConsent = false;
        this.requirePkce = false;
        this.slidingRefreshTokenLifetime = 1296000;
        this.updateAccessTokenClaimsOnRefresh = true;
        this.deviceCodeLifetime = 300;
        this.allowedScopes = [{ id: 0, clientId: this.id, scope: 'openid' }, { id: 0, clientId: this.id, scope: 'account' }];
        this.redirectUris = [];
        this.clientSecrets = [];
        this.allowedGrantTypes = [];
        this.allowedCorsOrigins = [];
        this.identityProviderRestrictions = [];
        this.properties = [];
        this.claims = [];
        this.postLogoutRedirectUris = [];
    }
}

export interface ClientView {
    id?: number;
    clientId?: number;
    viewName?: string;
}

export interface ClientIdPRestriction {
    id: number;
    provider: string;
    clientId: number;
}

export interface ClientCorsOrigin {
    id: number;
    origin: string;
    clientId: number;
}

export interface ClientProperty
{
    id: number;
    clientId: number;
    key: string;
    value: string;
}

export interface ClientClaim {
    id: number;
    type: string;
    value: string;
    clientId: number;
}

export interface ClientScope {
    id: number;
    scope: string;
    clientId: number;
}

export interface ClientSecret {
    id: number;
    clientId: number;
    description: string;
    value: string;
    expiration: Date;
    type: string;
    created: Date;
}

export interface ClientGrantType {
    id: number;
    grantType: string;
    clientId: number;
}

export interface ClientRedirectUri {
    id: number;
    redirectUri: string;
    clientId: number;
}

export interface ClientPostLogoutRedirectUri {
    id: number;
    postLogoutRedirectUri: string;
    clientId: number;
}
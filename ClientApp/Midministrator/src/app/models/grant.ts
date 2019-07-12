export interface Grant {
    key: string;
    clientId: string;
    creationTime: Date;
    data: string;
    expiration: Date;
    subjectId: string;
    type: string;
}

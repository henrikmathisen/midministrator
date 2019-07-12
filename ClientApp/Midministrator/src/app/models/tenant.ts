export interface Tenant {
    id: number;
    name: string;
    identifier: string;
    isDeleted: boolean;
    deleted: Date;
    created: Date;
    deletedBy: string;
}
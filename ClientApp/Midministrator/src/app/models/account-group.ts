import { Group } from './group';
import { MidentityAccount } from './account';

export interface AccountGroup {
    groupId: number;
    accountId: number;
    group: Group;
    account: MidentityAccount;
}
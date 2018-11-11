import {initAPI} from "./initAPI";
import {charge} from "./actions";
import {deposit_for} from "./helper";

const CUSTOMER = 'useraaaaaaaa';
const SHOPUSER = 'useraaaaaaab';

const shop = initAPI('5KLqT1UFxVnKRWkjvhFur4sECrPhciuUqsYRihc1p9rxhXQMZBg');
const DEFAULT_TRANS = { blocksBehind: 3, expireSeconds: 30 };

export class Customer {
    static async charge() {
        await shop.transact({ actions: [charge(CUSTOMER, SHOPUSER, '10.0000 STB')] }, DEFAULT_TRANS);
    }

    static async getBalance() {
        const balance = await deposit_for({ user: SHOPUSER });
        return balance;
    }
}

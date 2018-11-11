import {deposit, pay, prepare} from "./actions";
import {deposit_for} from "./helper";
import {initAPI} from "./initAPI";

const CUSTOMER = 'useraaaaaaaa';
const SHOPUSER = 'useraaaaaaab';

const customer = initAPI('5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5');
const DEFAULT_TRANS = { blocksBehind: 3, expireSeconds: 30 };

export class Customer {
    static async getBalance() {
        const balance = await deposit_for({ user: CUSTOMER });
        return balance;
    }

    static async deposit() {
        await customer.transact({ actions: [deposit(CUSTOMER, CUSTOMER, '10.0000 STB')] }, DEFAULT_TRANS);
        const balance = await deposit_for({ user: CUSTOMER });
        return balance;
    }

    static async prepare() {
        await customer.transact({ actions: [prepare(CUSTOMER)] }, DEFAULT_TRANS);
    }

    static async pay() {
        await customer.transact({ actions: [pay(CUSTOMER, SHOPUSER)] }, DEFAULT_TRANS);
        const balance = await deposit_for({ user: CUSTOMER });
        return balance;
    }
}

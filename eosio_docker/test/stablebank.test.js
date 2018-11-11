import {initAPI, rpc} from './utils/initAPI';
import {deposits, prepares, payment} from './utils/helper';
import {deposit, prepare, charge, pay} from './utils/actions';

const CONTRACT = 'stablebankac';
const CUSTOMER = 'useraaaaaaaa';
const SHOPUSER = 'useraaaaaaab';

const customer = initAPI('5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5');
const shop = initAPI('5KLqT1UFxVnKRWkjvhFur4sECrPhciuUqsYRihc1p9rxhXQMZBg');

const DEFAULT_TRANS = {blocksBehind: 3, expireSeconds: 30};

test('deposit', async () => {
    await customer.transact({
        actions: [deposit(CUSTOMER, CUSTOMER, '10.0000 SYS')]
    }, DEFAULT_TRANS);
    const [balanceI, balanceU] = await deposits();
    console.log(balanceU);
});

test('shop deposit', async () => {
    await shop.transact({
        actions: [deposit(SHOPUSER, SHOPUSER, '10.0000 SYS')]
    }, DEFAULT_TRANS);
    const [balanceI, balanceU, balanceS] = await deposits();
    console.log(balanceU, balanceS);
});

test('prepare', async () => {
    await customer.transact({
        actions: [prepare(CUSTOMER)]
    }, DEFAULT_TRANS);
    const [prepare_record] = await prepares();
    console.log(prepare_record);
});

test('charge', async () => {
    await shop.transact({
        actions: [charge(
            CUSTOMER, SHOPUSER, '1.0000 SYS'
        )]
    }, DEFAULT_TRANS);
    const [payment_record] = await payment({user: CUSTOMER});
    console.log(payment_record);
});

test('pay', async () => {
    const [ib, balanceBefore] = await deposits();
    console.log(balanceBefore);
    console.log('===============');
    await customer.transact({
        actions: [pay(
            CUSTOMER, SHOPUSER, '10.0000 SYS'
        )]
    }, DEFAULT_TRANS);
    const [payment_record] = await payment({user: CUSTOMER});
    const [i, balance] = await deposits();
    console.log(balance);
}, 15000);

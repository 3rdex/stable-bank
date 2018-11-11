import {initAPI} from './utils/initAPI';
import {prepares, payment, holds, deposit_for} from './utils/helper';
import {deposit, prepare, charge, pay} from './utils/actions';

const CUSTOMER = 'useraaaaaaaa';
const SHOPUSER = 'useraaaaaaab';

const customer = initAPI('5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5');
const shop = initAPI('5KLqT1UFxVnKRWkjvhFur4sECrPhciuUqsYRihc1p9rxhXQMZBg');

const DEFAULT_TRANS = {blocksBehind: 3, expireSeconds: 30};

test('deposit', async () => {
    const balanceBefore = await deposit_for({user: CUSTOMER});

    await customer.transact({actions: [deposit(CUSTOMER, CUSTOMER, '10.0000 STB')]}, DEFAULT_TRANS);

    const balance = await deposit_for({user: CUSTOMER});
    const diff = balance - balanceBefore;
    expect(diff).toBeCloseTo(10);
});

test('shop deposit', async () => {
    const balanceBefore = await deposit_for({user: SHOPUSER});

    await shop.transact({actions: [deposit(SHOPUSER, SHOPUSER, '10.0000 STB')]}, DEFAULT_TRANS);

    const balance = await deposit_for({user: SHOPUSER});
    const diff = balance - balanceBefore;
    expect(diff).toBeCloseTo(10);
});

test('prepare', async () => {
    await customer.transact({actions: [prepare(CUSTOMER)]}, DEFAULT_TRANS);

    const [prepare_record] = await prepares();
    expect(prepare_record.user).toBe(CUSTOMER);
});

test('charge', async () => {
    await shop.transact({actions: [charge(CUSTOMER, SHOPUSER, '1.0000 STB')]}, DEFAULT_TRANS);

    const paymentList = await payment({user: CUSTOMER});
    expect(paymentList.length).toBe(1);
    const [payment_record] = paymentList;
    expect(payment_record.amount).toBe('1.0000 STB');
});

test('pay', async () => {
    const shopBalanceBefore = await deposit_for({user: SHOPUSER});
    const customerBalanceBefore = await deposit_for({user: CUSTOMER});

    await customer.transact({actions: [pay(CUSTOMER, SHOPUSER)]}, DEFAULT_TRANS);

    const paymentList = await payment({user: CUSTOMER});
    expect(paymentList.length).toBe(0);
    const hold_list = await holds({user: CUSTOMER});
    const hold_record = hold_list.reverse()[0];
    expect(hold_record.amount).toBe('0.0990 STB');

    const shopBalance = await deposit_for({user: SHOPUSER});
    const customerBalance = await deposit_for({user: CUSTOMER});
    expect(shopBalance - shopBalanceBefore).toBeCloseTo(0.9);
    expect(customerBalanceBefore - customerBalance).toBeCloseTo(1);

}, 15000);

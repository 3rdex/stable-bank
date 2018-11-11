import {rpc} from './initAPI';

const CONTRACT = CONTRACT;

export async function prepares() {
    const query = {code: CONTRACT, scope: CONTRACT, table: 'prepaystruct'};
    const {rows} = await rpc.get_table_rows(query);
    return rows;
}

export async function deposit_for({user}) {
    const query = {
        json: true,
        code: CONTRACT,
        scope: CONTRACT,
        table: 'depostruct',
        index_position: 2,
        key_type: 'i64',
        lower_bound: user,
    };
    const {rows: [balance]} = await rpc.fetch(
        "/v1/chain/get_table_rows", query);
    return Number(balance.deposit.split(' ')[0]);
}

export async function payment({user}) {
    const query = {code: CONTRACT, scope: user, table: 'paystruct'};
    const {rows} = await rpc.get_table_rows(query);
    return rows;
}

export async function holds() {
    const query = {code: CONTRACT, scope: CONTRACT, table: 'holdstruct'};
    const {rows} = await rpc.get_table_rows(query);
    return rows;
}

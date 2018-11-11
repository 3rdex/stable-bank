export function deposit(from, user, quantity) {
    return {
        account: 'eosio.token',
        name: 'transfer',
        authorization: [{actor: from, permission: 'active'}],
        data: {from: from, to: 'stablebankac', quantity: quantity, memo: user},
    };
}

export function prepare(from) {
    return {
        account: 'stablebankac',
        name: 'preparepay',
        authorization: [{actor: from, permission: 'active'}],
        data: {from},
    };
}

export function charge(from, shop, amount) {
    return {
        account: 'stablebankac',
        name: 'charge',
        authorization: [{actor: shop, permission: 'active'}],
        data: {from, shop, amount},
    };
}

export function pay(from, shop) {
    return {
        account: 'stablebankac',
        name: 'pay',
        authorization: [{actor: from, permission: 'active'}],
        data: {from, shop},
    };
}

import { Api, JsonRpc, RpcError, JsSignatureProvider, SerialBuffer } from 'eosjs';

export const rpc = new JsonRpc('http://127.0.0.1:8888', { fetch });

export function initAPI(defaultPrivateKey) {
    const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
    return api;
}

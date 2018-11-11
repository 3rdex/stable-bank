import { rpc } from './initAPI';
export async function prepares() {
  const query = { code: 'stablebankac', scope: 'stablebankac', table: 'prepaystruct' };
  const { rows } = await rpc.get_table_rows(query);
  return rows;
}

export async function deposits() {
  const query = { code: 'stablebankac', scope: 'stablebankac', table: 'depostruct' };
  const { rows } = await rpc.get_table_rows(query);
  return rows;
}

export async function payment({ user }) {
  const query = { code: 'stablebankac', scope: user, table: 'paystruct' };
  const { rows } = await rpc.get_table_rows(query);
  return rows;
}

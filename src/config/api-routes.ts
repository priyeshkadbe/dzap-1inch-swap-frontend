import { serverConfig } from './serverConfig';
export const route = {
  fetchToken: serverConfig.API_URL + 'tokens/',
  getQuote: serverConfig.API_URL + 'quote/',
  swap: serverConfig.API_URL + 'swap/',
  allowance: serverConfig.API_URL + 'approve/allowance',
  transaction: serverConfig.API_URL + 'approve/transaction',
};

import axios from 'axios';

const base = `${process.env.SERVER_URL}/api/v1/app`;
const includeAuth = true;

export function getInvoices(params) {
  return axios.get(`${base}/invoices`, { params, includeAuth });
}

export default { getInvoices };

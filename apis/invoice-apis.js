import axios from 'axios';

const base = `${process.env.SERVER_URL}/api/v1/app`;
const includeAuth = true;

export const getInvoices = params => axios.get(`${base}/invoices`, { params, includeAuth });

export const createInvoice = body => axios.post(`${base}/invoice`, body, { includeAuth });

export const createInvoicePayment = body => axios.post(`${base}/invoice/payment`, body, { includeAuth });

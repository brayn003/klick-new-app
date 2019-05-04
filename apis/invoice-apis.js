import axios from 'axios';

const base = `${process.env.SERVER_URL}/api/v1/app`;
const includeAuth = true;

export const getInvoices = params => axios.get(`${base}/invoices`, { params, includeAuth });

export const getInvoice = id => axios.get(`${base}/invoice/${id}`, { includeAuth });

export const createInvoice = body => axios.post(`${base}/invoice`, body, { includeAuth });

export const updateInvoice = (id, body) => axios.patch(`${base}/invoice/${id}`, body, { includeAuth });

export const createInvoicePayment = body => axios.post(`${base}/invoice/payment`, body, { includeAuth });

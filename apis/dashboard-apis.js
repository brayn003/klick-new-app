import axios from 'axios';

const base = `${process.env.SERVER_URL}/api/v1/app`;
const includeAuth = true;

export const getExpenseCategoryPie = params => axios.get(`${base}/dashboard/expense-category-pie`, { includeAuth, params });

export const getCashflowBar = params => axios.get(`${base}/dashboard/cashflow-bar`, { includeAuth, params });

export const getInvoiceValue = params => axios.get(`${base}/dashboard/invoice-value`, { includeAuth, params });

export const getClientValueTable = params => axios.get(`${base}/dashboard/client-value-table`, { includeAuth, params });

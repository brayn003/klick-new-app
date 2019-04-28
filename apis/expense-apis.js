import axios from 'axios';

const base = `${process.env.SERVER_URL}/api/v1/app`;
const includeAuth = true;

export const getExpenses = params => axios.get(`${base}/expenses`, { params, includeAuth });

export const createExpense = body => axios.post(`${base}/expense`, body, { includeAuth });

export const getExpenseCategories = params => axios.get(`${base}/expense/categories`, { params, includeAuth });

export const createExpenseCategory = body => axios.post(`${base}/expense/category`, body, { includeAuth });

export const createExpensePayment = body => axios.post(`${base}/expense/payment`, body, { includeAuth });

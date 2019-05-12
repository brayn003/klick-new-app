import axios from 'axios';

const base = `${process.env.SERVER_URL}/api/v1/app`;
const includeAuth = true;

export const getExpenseCategoryPie = params => axios.get(`${base}/dashboard/expense-category-pie`, { includeAuth, params });

export default { getExpenseCategoryPie };

import axios from 'axios';

const base = `${process.env.SERVER_URL}/api/v1/app`;
const includeAuth = true;

export function getExpenses(params) {
  return axios.get(`${base}/expenses`, { params, includeAuth });
}

export default { getExpenses };

import axios from 'axios';

const base = `${process.env.SERVER_URL}/api/v1/app/`;
const includeAuth = true;

export function getTaxTypes(params) {
  return axios.get(`${base}/tax-types`, { params, includeAuth });
}

export default { getTaxTypes };

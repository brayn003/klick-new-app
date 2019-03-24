import axios from 'axios';

const base = `${process.env.SERVER_URL}/api/v1/app`;
const includeAuth = true;

export function getOrganizations(params) {
  return axios.get(`${base}/organizations`, { params, includeAuth });
}

export function getOrganization(id, params, token) {
  const headers = {};
  if (token) {
    headers.Authorization = `Token ${token}`;
  }
  return axios.get(`${base}/organization/${id}`, {
    headers,
    params,
    includeAuth,
  });
}

export default { getOrganizations };

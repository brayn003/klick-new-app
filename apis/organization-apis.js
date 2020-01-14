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

export function createOrganization(body) {
  return axios.post(`${base}/organization`, body, { includeAuth });
}

export function deleteOrganization(id) {
  return axios.delete(`${base}/organization/${id}`, { includeAuth });
}

export function updateOrganization(id, body) {
  return axios.patch(`${base}/organization/${id}`, body, { includeAuth });
}

export default { getOrganizations };

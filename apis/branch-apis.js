import axios from 'axios';

const base = `${process.env.SERVER_URL}/api/v1/app/organization`;
const includeAuth = true;

export function getBranches(params) {
  return axios.get(`${base}/branches`, { params, includeAuth });
}

export function createBranch(body) {
  return axios.post(`${base}/branch`, body, { includeAuth });
}

export function updateBranch(id, body) {
  return axios.patch(`${base}/branch/${id}`, body, { includeAuth });
}

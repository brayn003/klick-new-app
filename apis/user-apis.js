import axios from 'axios';

const base = `${process.env.SERVER_URL}/api/v1/app`;

export function getMe(token) {
  const includeAuth = !token;
  const headers = {};
  if (token) {
    headers.Authorization = `Token ${token}`;
  }
  return axios.get(`${base}/user/me`, { includeAuth, headers });
}

export default { getMe };

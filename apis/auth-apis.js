import axios from 'axios';

const base = `${process.env.SERVER_URL}/api/v1`;

export function login(body) {
  return axios.post(`${base}/auth/login`, body);
}

export function register(body) {
  return axios.post(`${base}/auth/register`, body);
}

export function verifyToken(body) {
  return axios.post(`${base}/auth/verify-token`, body);
}

import axios from 'axios';

const base = `${process.env.SERVER_URL}/api/v1`;

export const login = body => axios.post(`${base}/auth/login`, body);

export const register = body => axios.post(`${base}/auth/register`, body);

export const verifyToken = body => axios.post(`${base}/auth/verify-token`, body);

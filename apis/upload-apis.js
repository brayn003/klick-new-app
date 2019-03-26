import axios from 'axios';

const base = `${process.env.SERVER_URL}/api/v1/app/upload`;
const includeAuth = true;

export function getUploadUrl(params) {
  return axios.get(`${base}/signed-url`, { params, includeAuth });
}

export default { getUploadUrl };

import axios from 'axios';

const base = `${process.env.SERVER_URL}/api/v1/app/location`;
const includeAuth = true;

export const getLocationStates = params => axios.get(`${base}/states`, { params, includeAuth });

export default {
  getLocationStates,
};

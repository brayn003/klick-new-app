import axios from 'axios';
// import { notification } from 'antd';
import omit from 'lodash/omit';
import cookies from 'js-cookie';
import isUnderfined from 'lodash/isUndefined';

import { handleError } from './error-handler';

function showError(description, title) {
  if (typeof window !== 'undefined') {
    // notification.error({
    //   message: title || 'Some error occured',
    //   description,
    // });
    console.error(title);
  }
}

function requestHandler(config) {
  const newConfig = config;
  const autd = cookies.get('autd');
  if (config.includeAuth === true && autd) {
    newConfig.headers.Authorization = `Token ${autd}`;
  }
  return newConfig;
}

function requestErrorHandler(error) {
  showError(handleError(error));
  return Promise.reject(error);
}

function responseHandler(response) {
  if (isUnderfined(response.data.success)) {
    return response.data;
  }

  if (!response.data.success) {
    showError(handleError(omit(response.data, ['success'])));
    return Promise.reject(response.data);
  }
  return response.data;
}

function responseErrorHandler(error) {
  if (error.response) {
    showError(handleError(omit(error.response.data, ['success'])));
    return Promise.reject(error.response.data);
  }
  if (error.request) {
    showError(handleError(error.request));
    return Promise.reject(error.request);
  }
  showError(handleError(error));
  return Promise.reject(error);
}

export default function intercept() {
  const requestHandlers = axios.interceptors.request.handlers;
  const responseHandlers = axios.interceptors.response.handlers;
  if (requestHandlers.length === 0) {
    axios.interceptors.request.use(requestHandler, requestErrorHandler);
  }
  if (responseHandlers.length === 0) {
    axios.interceptors.response.use(responseHandler, responseErrorHandler);
  }
}

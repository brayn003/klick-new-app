import cookies from 'js-cookie';

const initialState = cookies.get('activeOrg') || null;

export const AUTH_TOKEN_SET = 'set auth token';
export const AUTH_TOKEN_RESET = 'reset auth token';

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case AUTH_TOKEN_SET:
      return payload.token;
    case AUTH_TOKEN_RESET:
      return initialState;
    default:
      return state;
  }
}

export const setTokenAction = token => ({ type: AUTH_TOKEN_SET, payload: { token } });

export const resetTokenAction = () => ({ type: AUTH_TOKEN_RESET, payload: {} });

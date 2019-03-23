import { getMe } from 'apis/user-apis';
import { handleError } from 'helpers/error-handler';

const initialState = {
  value: null,
  loading: false,
  error: null,
};

export const USER_ME_REQUESTED = 'get user/me requested';
export const USER_ME_SUCCEEDED = 'get user/me succeeded';
export const USER_ME_FAILED = 'get user/me failed';

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_ME_REQUESTED:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case USER_ME_SUCCEEDED:
      return {
        ...state,
        value: payload.me,
        loading: false,
        error: null,
      };
    case USER_ME_FAILED:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };
    default:
      return state;
  }
}

export const getMeAction = token => async (dispatch) => {
  dispatch({ type: USER_ME_REQUESTED, payload: {} });
  try {
    const me = await getMe(token);
    dispatch({ type: USER_ME_SUCCEEDED, payload: { me } });
  } catch (err) {
    dispatch({ type: USER_ME_FAILED, payload: { error: handleError(err) } });
  }
};

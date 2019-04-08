import cookies from 'js-cookie';
import { getOrganization } from 'apis/organization-apis';
import { handleError } from 'helpers/error-handler';

const initialState = {
  value: null,
  loading: false,
  error: null,
};

export const ORGANIZATION_SET_ACTIVE_REQUESTED = 'set active organization requested';
export const ORGANIZATION_SET_ACTIVE_SUCCEEDED = 'set active organization succeeded';
export const ORGANIZATION_SET_ACTIVE_FAILED = 'set active organization failed';
export const ORGANIZATION_RESET_ACTIVE = 'reset active organization';

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ORGANIZATION_SET_ACTIVE_REQUESTED:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ORGANIZATION_SET_ACTIVE_SUCCEEDED:
      return {
        ...state,
        value: payload.organization,
        loading: false,
      };
    case ORGANIZATION_SET_ACTIVE_FAILED:
      return {
        ...state,
        value: payload.error,
      };
    case ORGANIZATION_RESET_ACTIVE:
      return initialState;
    default:
      return state;
  }
}

export const setActiveOrgAction = organizationId => async (dispatch, getStore) => {
  dispatch({ type: ORGANIZATION_SET_ACTIVE_REQUESTED, payload: {} });
  cookies.set('activeOrg', organizationId);
  const state = await getStore();
  const { token } = state.auth;
  try {
    const organization = await getOrganization(organizationId, undefined, token);
    dispatch({
      type: ORGANIZATION_SET_ACTIVE_SUCCEEDED,
      payload: { organization },
    });
  } catch (err) {
    dispatch({
      type: ORGANIZATION_SET_ACTIVE_FAILED,
      payload: { error: handleError(err) },
    });
  }
};

export const resetActiveOrgAction = () => ({ type: ORGANIZATION_RESET_ACTIVE, payload: {} });

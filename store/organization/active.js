import cookies from 'js-cookie';
import { getOrganization } from 'apis/organization-apis';
import { handleError } from 'helpers/error-handler';

const intialState = {
  value: null,
  loading: false,
  error: null,
};

export const ORGANIZATION_SET_ACTIVE_REQUESTED = 'set active organization requested';
export const ORGANIZATION_SET_ACTIVE_SUCCEEDED = 'set active organization succeeded';
export const ORGANIZATION_SET_ACTIVE_FAILED = 'set active organization failed';

export default function (state = intialState, action) {
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
    default:
      return state;
  }
}

export const setActiveOrganizationAction = organizationId => async (dispatch) => {
  dispatch({ type: ORGANIZATION_SET_ACTIVE_REQUESTED, payload: {} });
  cookies.set('activeOrg', organizationId);
  try {
    const organization = await getOrganization();
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

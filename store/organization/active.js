const intialState = typeof window === 'undefined' ? null : localStorage.getItem('active_organization');

export const ORGANIZATION_ACTIVE_SET = 'set active organization';

export default function (state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ORGANIZATION_ACTIVE_SET:
      return payload.organizationId;
    default:
      return state;
  }
}

export const setActiveOrganizationAction = organizationId => ({
  type: ORGANIZATION_ACTIVE_SET,
  payload: { organizationId },
});

import { combineReducers } from 'redux';

import user from './user';
import organization from './organization';
import auth from './auth';

export default combineReducers({
  user,
  organization,
  auth,
});

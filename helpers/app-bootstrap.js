
import { checkToken, getCookie } from 'helpers/auth-service';
import { getMeAction } from 'store/user/me';
import { setActiveOrgAction } from 'store/organization/active';
import { setTokenAction } from 'store/auth/token';

export async function checkOrganization(ctx) {
  const {
    res, pathname, reduxStore,
  } = ctx;
  const { dispatch } = reduxStore;
  if (res) {
    const activeOrg = getCookie('activeOrg', ctx);
    if (activeOrg) {
      await dispatch(setActiveOrgAction(activeOrg));
    }
    if (!activeOrg && pathname !== '/login' && pathname !== '/forgot-password' && pathname !== '/organization') {
      res.redirect('/organization');
    }
  }
}

export default async function bootstrap(ctx) {
  const token = await checkToken(ctx);
  const { dispatch } = ctx.reduxStore;
  if (token) {
    await dispatch(setTokenAction(token));
  }
  await dispatch(getMeAction(token));
  await checkOrganization(ctx);
}


import { checkToken } from 'helpers/auth-service';
import { getMeAction } from 'store/user/me';
import { setActiveOrgAction } from 'store/organization/active';
import { setTokenAction } from 'store/auth/token';

export async function checkOrganization(ctx) {
  const {
    req, res, pathname, reduxStore,
  } = ctx;
  const { dispatch } = reduxStore;
  if (res) {
    const { activeOrg } = req.cookies;
    console.log('activeOrg', activeOrg);
    if (activeOrg) {
      await dispatch(setActiveOrgAction(activeOrg));
    }
    if (!activeOrg && pathname !== '/organization') {
      res.redirect('/organization');
    }
  }
}

export default async function bootstrap(ctx) {
  const token = await checkToken(ctx);
  const { dispatch } = ctx.reduxStore;
  await dispatch(setTokenAction(token));
  if (ctx.req) {
    await dispatch(getMeAction(token));
  }
  await checkOrganization(ctx);
}

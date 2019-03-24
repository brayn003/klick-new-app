
import { checkToken } from 'helpers/auth-service';
import { getMeAction } from 'store/user/me';
import { setActiveOrganizationAction } from '../store/organization/active';

export async function checkOrganization(ctx) {
  const {
    req, res, pathname, reduxStore,
  } = ctx;
  const { dispatch } = reduxStore;
  if (res) {
    const { activeOrg } = req.cookies;
    if (activeOrg) {
      dispatch(setActiveOrganizationAction(activeOrg));
    }
    if (!activeOrg && pathname !== '/organization') {
      res.redirect('/organization');
    }
  }
}

export default async function bootstrap(ctx) {
  const token = await checkToken(ctx);
  const { dispatch } = ctx.reduxStore;

  if (ctx.req) {
    await dispatch(getMeAction(token));
  }
  await checkOrganization(ctx);
}

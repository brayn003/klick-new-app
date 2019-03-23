
import { checkToken } from 'helpers/auth-service';
import { getMeAction } from 'store/user/me';

export async function checkOrganization(ctx) {
  const { reduxStore, res, pathname } = ctx;
  const { getState } = reduxStore;
  const store = await getState();
  if (res) {
    if (!store.organization.active && pathname !== '/organization') {
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

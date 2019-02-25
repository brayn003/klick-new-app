import cookie from 'js-cookie';
import { verifyToken } from '../apis/auth-apis';

export async function checkToken(ctx) {
  const { req = false, pathname } = ctx;
  if (req) {
    const { autd } = ctx.req.cookies;
    if (!autd && pathname !== '/login') {
      ctx.res.redirect('/login');
    }
    if (autd && pathname === '/login') {
      const res = await verifyToken({ token: autd });
      if (res.success) {
        ctx.res.redirect('/');
      }
    }
  } else {
    const module = await import('next/router');
    const Router = module.default;
    const autd = cookie.get('autd');
    if (!autd && pathname !== '/login') {
      Router.push('/login');
    }
    if (autd && pathname === '/login') {
      const res = await verifyToken({ token: autd });
      if (res.success) {
        Router.push('/');
      }
    }
  }
}


export default {
  checkToken,
};

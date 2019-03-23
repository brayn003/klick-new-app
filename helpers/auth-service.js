import cookie from 'js-cookie';
import { verifyToken } from '../apis/auth-apis';

export async function checkToken(ctx) {
  const { req = false, pathname } = ctx;
  if (req) {
    const { sessToken } = ctx.req.cookies;
    if (!sessToken && pathname !== '/login') {
      ctx.res.redirect('/login');
    }
    if (sessToken && pathname === '/login') {
      const res = await verifyToken({ token: sessToken });
      if (res.verified) {
        ctx.res.redirect('/');
      }
    }
    return sessToken;
  }

  const md = await import('next/router');
  const Router = md.default;
  const sessToken = cookie.get('sessToken');
  if (!sessToken && pathname !== '/login') {
    Router.push('/login');
  }
  if (sessToken && pathname === '/login') {
    const res = await verifyToken({ token: sessToken });
    if (res.verified) {
      Router.push('/');
    }
  }
  return sessToken;
}

export async function setToken(sessToken, redirect = false) {
  const md = await import('next/router');
  const Router = md.default;
  cookie.set('sessToken', sessToken);
  if (redirect) {
    Router.push('/');
  }
}

export default {
  checkToken,
};

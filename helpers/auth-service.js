import cookies from 'js-cookie';
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
  const sessToken = cookies.get('sessToken');
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
  cookies.set('sessToken', sessToken);
  if (redirect) {
    if (cookies.get('activeOrg')) {
      Router.push('/');
    } else {
      Router.push('/organization');
    }
  }
}

export default {
  checkToken,
};

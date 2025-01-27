import cookies from 'js-cookie';
import { verifyToken } from '../apis/auth-apis';

export const getCookie = (name, ctx) => {
  const { req } = ctx || {};
  const token = req
    ? (req.headers.cookie || '').match(new RegExp(`${name}=([^;]+)`)) || []
    : document.cookie.match(new RegExp(`${name}=([^;]+)`)) || [];
  return token[1];
};

export async function checkToken(ctx) {
  const { req = false, pathname } = ctx;
  if (req) {
    const sessToken = getCookie('sessToken', ctx);
    const activeOrg = getCookie('activeOrg', ctx);
    if (!sessToken && (pathname !== '/login' && pathname !== '/forgot-password')) {
      ctx.res.redirect('/login');
      console.log('redirect', pathname);
    }
    if (sessToken) {
      try {
        const res = await verifyToken({ token: sessToken });
        if (res.verified && pathname !== '/') {
          if (!activeOrg && pathname !== '/organization') {
            ctx.res.redirect('/organization');
          }
        }
      } catch (err) {
        // ctx.res.clearCookie('sessToken');
        // ctx.res.clearCookie('activeOrg');
        if (pathname !== '/login' && pathname !== '/forgot-password') {
          ctx.res.redirect('/login');
        }
      }
    }
    return sessToken;
  }

  const md = await import('next/router');
  const Router = md.default;
  const sessToken = cookies.get('sessToken');
  if (!sessToken && (pathname !== '/login' && pathname !== '/forgot-password')) {
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

export async function clearToken(redirect = false) {
  const md = await import('next/router');
  const Router = md.default;
  cookies.remove('sessToken');
  cookies.remove('activeOrg');
  if (redirect) {
    Router.push('/login');
  }
}

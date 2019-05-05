import cookies from 'js-cookie';
import { verifyToken } from '../apis/auth-apis';

export async function checkToken(ctx) {
  const { req = false, pathname } = ctx;
  console.log(pathname);
  if (req) {
    const { sessToken, activeOrg } = ctx.req.cookies;
    if (!sessToken && pathname !== '/login') {
      ctx.res.redirect('/login');
    }
    if (sessToken) {
      try {
        console.log('hit verify token');
        const res = await verifyToken({ token: sessToken });
        if (res.verified && pathname !== '/') {
          if (!activeOrg && (pathname !== '/organization' && pathname !== '/organization/create')) {
            ctx.res.redirect('/organization');
          }
          // if (!activeOrg && pathname !== '/organization/create') {
          //   ctx.res.redirect('/organization/create');
          // }
        }
      } catch (err) {
        ctx.res.clearCookie('sessToken');
        ctx.res.clearCookie('activeOrg');
        if (pathname !== '/login') {
          ctx.res.redirect('/login');
        }
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

export async function clearToken(redirect = false) {
  const md = await import('next/router');
  const Router = md.default;
  cookies.remove('sessToken');
  cookies.remove('activeOrg');
  if (redirect) {
    Router.push('/login');
  }
}

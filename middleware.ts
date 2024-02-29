import authConfig from './auth.config';
import NextAuth from 'next-auth';
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // req.auth
  const isLoggedIn = !!req.auth;
  console.log('ROUTE', req.nextUrl.pathname);
});

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  // matcher: ['/auth/login', '/auth/register'],
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

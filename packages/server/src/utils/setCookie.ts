import { Context } from 'koa';

export const setCookie =
  (context: Context) => (cookieName: string, token: string) => {
    const options = {
      httpOnly: true,
      path: '/',
    };

    context.cookies.set(cookieName, token, options);
  };

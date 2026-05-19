export const getBaseRoute = (pathname: string) => {
  const [, base, slug] = pathname.split("/");
  return slug ? `/${base}/:slug` : `/${base}`;
};

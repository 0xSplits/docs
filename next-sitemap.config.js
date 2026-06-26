/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // Docs are served from splits.org/protocol/docs. next-sitemap prepends
  // siteUrl to each route path (route paths do NOT include basePath), so the
  // '/protocol/docs' segment lives on siteUrl here.
  siteUrl:
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ?
      'https://splits.org/protocol/docs' :
      `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/protocol/docs`,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'monthly',
  priority: 0.5,
}

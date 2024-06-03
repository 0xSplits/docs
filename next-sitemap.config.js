/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ?
      `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}` :
      `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'monthly',
  priority: 0.5,
}

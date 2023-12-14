/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:
    process.env.SITE_URL ||
    `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` ||
    'https://docs.splits.org',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

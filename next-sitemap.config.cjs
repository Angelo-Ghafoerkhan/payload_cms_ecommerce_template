const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  // Remove '/*' from exclude to avoid excluding all routes.
  // Also, exclude only the routes you don’t want (like posts or admin pages).
  exclude: ['/posts-sitemap.xml', '/pages-sitemap.xml', '/posts/*', '/admin/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/admin/*',
      },
    ],
    additionalSitemaps: [
      `${SITE_URL}/pages-sitemap.xml`,
      `${SITE_URL}/posts-sitemap.xml`,
      `${SITE_URL}/products-sitemap.xml`,
      `${SITE_URL}/product-categories-sitemap.xml`,
    ],
  },
}

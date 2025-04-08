// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { Settings } from './Globals/Settings/config'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { Gallery } from './collections/Gallery'
import { Products } from './collections/Ecommerce/Products'
import { Orders } from './collections/Ecommerce/Orders'
import { Discounts } from './collections/Ecommerce/Discounts'
import { Subscriptions } from './collections/Ecommerce/Subscriptions'
import { Plans } from './collections/Ecommerce/Plans'
import { Faqs } from './collections/Faqs'
import { Carts } from './collections/Ecommerce/Carts'
import { SubscriptionOrders } from './collections/Ecommerce/SubscriptionOrders'
import { ProductCategories } from './collections/Ecommerce/ProductCategories'
import { ProductImages } from './collections/Ecommerce/ProductImages'
import { admin } from './access/admin'
import { Shipping } from './collections/Ecommerce/Shipping'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const siteName = 'Verum Digital'

// const settings = await payload.getGlobal

export default buildConfig({
  email: nodemailerAdapter({
    defaultFromAddress: process.env.SMTP_ADMIN_USER as string,
    defaultFromName: process.env.SMTP_ADMIN_NAME as string,
    transportOptions: {
      host: process.env.SMTP_ADMIN_HOST,
      port: 587,
      auth: {
        user: process.env.SMTP_ADMIN_USER,
        pass: process.env.SMTP_ADMIN_PASS,
      },
    },
  }),
  admin: {
    components: {
      graphics: {
        Logo: './components/Logo/Logo#Logo',
        Icon: './components/Favicon',
      },
      Nav: './components/AdminNav#DefaultNav',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  collections: [
    Faqs,
    Gallery,
    Pages,
    Posts,
    Media,
    Categories,
    Users,
    // Ecommerce
    Products,
    Orders,
    Discounts,
    Carts,
    ProductCategories,
    ProductImages,
    Shipping,
    // Subscriptions
    Subscriptions,
    SubscriptionOrders,
    Plans,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, Settings],
  plugins: [...plugins],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})

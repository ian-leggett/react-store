import 'dotenv/config'
import { extendGraphqlSchema } from './mutations/index'
import { createAuth } from '@keystone-next/auth'
import { config, createSchema } from '@keystone-next/keystone/schema'

import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session'
import { insertSeedData } from './seed-data'
import { sendPasswordResetEmail } from './lib/mail'
import { permissionsList } from './schemas/fields'
import { Role } from './schemas/Role'
import { OrderItem } from './schemas/OrderItem'
import { Order } from './schemas/Order'
import { CartItem } from './schemas/CartItem'
import { Product } from './schemas/Product'
import { ProductImage } from './schemas/ProductImage'
import { User } from './schemas/User'
// import { insertSeedData } from './seed-data'
// import { sendPasswordResetEmail } from './lib/mail'
// import { extendGraphqlSchema } from './mutations'

const databaseURL = process.env.DATABASE_URL

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
  secret: process.env.COOKIE_SECRET,
}

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO: Add in inital roles here
  },
  passwordResetLink: {
    async sendToken(args) {
      await sendPasswordResetEmail(args.token, args.identity)
      // send the email
      // await sendPasswordResetEmail(args.token, args.identity);
    },
  },
})

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      async onConnect(keystone) {
        console.log('Connected to the database')
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone)
        }
      },
    },
    lists: createSchema({
      User,
      Product,
      ProductImage,
      CartItem,
      Order,
      OrderItem,
      Role
    }),
    extendGraphqlSchema,
    ui: {
      // Show the ui only for peole who pass this test
      isAccessAllowed: ({ session }) => {
        return !!session?.data
      },
    },
    session: withItemData(statelessSessions(sessionConfig), {
      // GraphQL Query
      User: `id name email role { ${permissionsList.join(' ')} }`,
    }),
  })
)
import 'dotenv/config'
import { createAuth } from '@keystone-next/auth'
import { config, createSchema } from '@keystone-next/keystone/schema'
import { User } from './schemas/User'
import { Product } from './schemas/Products'
import { ProductImage } from './schemas/ProductImage'

import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session'
import { insertSeedData } from './seed-data'
import { sendPasswordResetEmail } from './lib/mail'
// import { permissionsList } from './schemas/fields'
// import { Role } from './schemas/Role'
// import { OrderItem } from './schemas/OrderItem'
// import { Order } from './schemas/Order'
import { CartItem } from './schemas/CartItem'
// import { ProductImage } from './schemas/ProductImage'
// import { User } from './schemas/User'
// import { insertSeedData } from './seed-data'
// import { sendPasswordResetEmail } from './lib/mail'
// import { extendGraphqlSchema } from './mutations'

function check(name: string) {}

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
    }),
    ui: {
      // Show the ui only for peole who pass this test
      isAccessAllowed: ({ session }) => {
        return !!session?.data
      },
    },
    session: withItemData(statelessSessions(sessionConfig), {
      // GraphQL Query
      // User: `id name email role { ${permissionsList.join(' ')} }`,
    }),
  })
)

// export default withAuth(
//   config({
//     // @ts-ignore
//     server: {
//       cors: {
//         origin: [process.env.FRONTEND_URL],
//         credentials: true,
//       },
//     },
//     db: {
//       adapter: 'mongoose',
//       url: databaseURL,
//       async onConnect(keystone) {
//         console.log('Connected to the database!');
//         if (process.argv.includes('--seed-data')) {
//           await insertSeedData(keystone);
//         }
//       },
//     },
//     lists: createSchema({
//       // Schema items go in here
//       User,
//       Product,
//       ProductImage,
//       CartItem,
//       OrderItem,
//       Order,
//       Role,
//     }),
//     extendGraphqlSchema,
//     ui: {
//       // Show the UI only for poeple who pass this test
//       isAccessAllowed: ({ session }) =>
//         // console.log(session);
//         !!session?.data,
//     },
//     session: withItemData(statelessSessions(sessionConfig), {
//       // GraphQL Query
//       User: `id name email role { ${permissionsList.join(' ')} }`,
//     }),
//   })
// );

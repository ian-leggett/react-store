import Stripe from 'stripe'

const stripeConfig = new Stripe(process.env.STRIPE_SECRET || '', {
  apiVersion: '2020-08-27',
})

console.log(process.env.STRIPE_SECRET)

export default stripeConfig

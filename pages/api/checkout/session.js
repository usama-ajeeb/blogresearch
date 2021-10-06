import Stripe from 'stripe'
import db, { auth } from '../../../utils/firebase/firebase'

const stripe = new Stripe(
  'sk_test_51DqeK6ITE6sxes7uZQxQ39z9x0QiaElNFDFdr8d1k89FkXP1NRsIVbbRHyT8uLE7KOM9f4D1tvx7hHjAKGXeu9Sp007ir83pyT',
  {
    apiVersion: '2020-08-27',
  }
)

export default async (req, res) => {
  setTimeout(async () => {
    const session = await stripe.checkout.sessions
      .create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: 'price_1Jc7ZbITE6sxes7uBRu5XOuW',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `http://localhost:3000`,
        cancel_url: `https://${req.headers.origin}/checkout`,
      })
      .finally(() => {
        const id = auth.currentUser?.uid
        db.collection('users').doc(id).update({ credits: 20 })
      })
    res.status(200).json({ sessionId: session.id })
  }, 4000)
}

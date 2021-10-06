import React from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(
  'pk_test_51DqeK6ITE6sxes7uhdUBzimu8jbiijP4wNz5iXZV9OWPFbVI59IUc6NLNJfQO8j7PzGnDejNyqkPGncLuUzSVVvw00fgH8MHiA'
)

function checkout() {
  const handleClick = async () => {
    const { sessionId } = await fetch('/api/checkout/session', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
    }).then((res) => res.json())
    const stripe = await stripePromise
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    })
  }
  return (
    <div>
      <button onClick={handleClick} className='bg-red-400 text-white'>
        Checkout Now
      </button>
    </div>
  )
}

export default checkout

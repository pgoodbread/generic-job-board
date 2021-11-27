import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

export default async function handleStripeCheckout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return;
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
  });

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${req.headers.origin}/checkout/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/jobs/create`,
  });

  res.status(200).json({ url: session.url! });
}

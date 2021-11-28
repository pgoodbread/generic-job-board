import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { BaseJob, JobForForm } from "../../../types";
import { convertToBaseJob } from "../../../utils";

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
  const jobForForm: JobForForm = JSON.parse(req.body);

  const baseJob = convertToBaseJob(jobForForm, session.id);

  saveJobPost(baseJob);

  res.status(200).json({ url: session.url! });
}

async function saveJobPost(job: BaseJob) {
  const client = new MongoClient(process.env.MONGO_URI!);

  try {
    await client.connect();

    const db = client.db("generic_job_board");
    const collection = db.collection("jobs");

    await collection.insertOne(job);
  } finally {
    await client.close();
  }
}

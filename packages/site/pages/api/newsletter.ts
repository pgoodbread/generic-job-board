import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handleNewsletterSingUp(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return;
  }

  const uri = process.env.MONGO_URI;
  const db = process.env.MONGO_DATABASE;

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const collection = client.db(db).collection("newsletter_signup");

    const emailRequestBody = JSON.parse(req.body);

    const result = await collection.findOne<{ email: string }>({
      email: {
        $eq: emailRequestBody.email,
      },
    });

    if (result) {
      return res.status(200).json({});
    }

    await collection.insertOne(emailRequestBody);
  } finally {
    await client.close();
  }

  res.status(201).json({});
}

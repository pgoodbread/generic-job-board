import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handleTagSearch(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return;
  }

  const uri = process.env.MONGO_URI;
  const db = process.env.MONGO_DATABASE;

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const collection = client.db(db).collection("jobs");

    const searchTerm = req.query.q as string;

    const result = await collection
      .find({
        tags: new RegExp(searchTerm),
      })
      .toArray();

    return res.status(200).json(result || {});
  } finally {
    await client.close();
  }
}

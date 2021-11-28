import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { BaseJob } from "../../../types";

export default async function handleJobPostUpdate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return;
  }

  const stripeJobData: Pick<BaseJob, "sessionId" | "email"> = JSON.parse(
    req.body
  );

  const client = new MongoClient(process.env.MONGO_URI!);

  try {
    await client.connect();

    const db = client.db("generic_job_board");
    const collection = db.collection("jobs");

    await collection.updateOne(
      { sessionId: stripeJobData.sessionId },
      {
        $set: {
          email: stripeJobData.email,
          publicationDate: new Date().toISOString(),
        },
      }
    );
  } finally {
    await client.close();
  }

  res.status(200).json({ updateResult: "success" });
}

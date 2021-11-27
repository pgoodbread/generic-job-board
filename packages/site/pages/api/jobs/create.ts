import type { NextApiRequest, NextApiResponse } from "next";

export default async function handleJobPosting(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return;
  }

  res.status(201).json({});
}

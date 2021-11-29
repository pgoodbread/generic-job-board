import aws from "aws-sdk";
import cuid from "cuid";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handleFeedback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return;
  }

  aws.config.update({
    accessKeyId: process.env.S3_UPLOAD_KEY,
    secretAccessKey: process.env.S3_UPLOAD_SECRET,
    region: process.env.S3_UPLOAD_REGION,
    signatureVersion: "v4",
  });

  const s3 = new aws.S3();
  const post = s3.createPresignedPost({
    Bucket: process.env.S3_UPLOAD_BUCKET,
    Fields: {
      key: "public/" + cuid() + req.query.file,
    },
    Expires: 60,
    Conditions: [["content-length-range", 0, 512000]],
  });

  res.status(200).json(post);
}

import sendgrid from "@sendgrid/mail";
import type { NextApiRequest, NextApiResponse } from "next";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

export default async function handleFeedback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return;
  }

  const { feedback, type } = req.body;

  try {
    await sendgrid.send({
      from: process.env.EMAIL_ACCOUNT!,
      to: process.env.EMAIL_ACCOUNT!,
      subject: "⚛️ React Jobs - " + type,
      text: feedback,
    });
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

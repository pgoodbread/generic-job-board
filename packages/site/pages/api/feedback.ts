import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handleFeedback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const { feedback, type } = req.body;

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: "devronhansen@gmail.com, p.gutbrodt@gmail.com",
    subject: "⚛️ Reactjobs - " + type,
    text: feedback,
  });

  transporter.close();

  res.status(201).json({});
}

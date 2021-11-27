import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handleFeedback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return;
  }

  console.log(process.env.GMAIL_USER);
  console.log(process.env.GMAIL_PASSWORD);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: "devronhansen@gmail.com, p.gutbrodt@gmail.com",
    subject: "Hello, you have received feedback 🚀",
    text: JSON.stringify(req.body),
  });

  transporter.close();

  res.status(201).json({});
}
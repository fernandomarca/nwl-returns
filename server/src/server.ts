import express from "express";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "971a8548ccbbb7",
    pass: "1d4c6bb26f9ffa",
  },
});

app.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;
  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  });

  await transport.sendMail({
    from: "Equipe Feedback <oi@feedget.com>",
    to: "Fernando <fernandomarca@hotmail.com>",
    subject: "Novo feedback",
    html: [
      `<div style="font-family: sans-serif; font-size:16px; color:#111;">`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Tipo do feedback: ${comment}</p>`,
      `</div>`,
    ].join("\n"),
  });

  return res.status(201).json({ data: feedback });
});

app.listen(3333, () => {
  console.log("http server running! 🚀");
});

import nodemailer from "nodemailer";
const Transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.USER}`,
    pass: process.env.PASSWORD,
  },
});

export { Transporter };
